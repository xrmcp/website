import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { codeToHtml } from 'shiki'
import { ArrowLeft, Download, GithubIcon, Tag, Folder, Terminal } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { METADATA_URL, getManifestUrl, getCategoryColor, type RegistryMetadata, type ToolMetadata } from '@/lib/registry'
import { CopyButton } from './copy-button'

interface Props {
  params: Promise<{ path: string[] }>
}

async function getToolByPath(pathSegments: string[]): Promise<{ tool: ToolMetadata; manifest: unknown } | null> {
  try {
    // Reconstruct the path from segments
    const fullPath = pathSegments.join('/') + '.xrmcp.json'
    
    // Fetch the registry metadata
    const registryResponse = await fetch(METADATA_URL, {
      next: { revalidate: 3600 },
    })
    
    if (!registryResponse.ok) {
      return null
    }
    
    const registry: RegistryMetadata = await registryResponse.json()
    const tool = registry.tools.find((t) => t.path === fullPath)
    
    if (!tool) {
      return null
    }
    
    // Fetch the actual manifest
    const manifestUrl = getManifestUrl(tool.path)
    const manifestResponse = await fetch(manifestUrl, {
      next: { revalidate: 3600 },
    })
    
    if (!manifestResponse.ok) {
      return null
    }
    
    const manifest = await manifestResponse.json()
    
    return { tool, manifest }
  } catch (error) {
    console.error('Error fetching tool:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  const data = await getToolByPath(path)
  
  if (!data) {
    return {
      title: 'Tool Not Found - xrMCP',
    }
  }
  
  return {
    title: `${data.tool.displayName} - xrMCP Registry`,
    description: data.tool.description,
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { path } = await params
  const data = await getToolByPath(path)
  
  if (!data) {
    notFound()
  }
  
  const { tool, manifest } = data
  const manifestJson = JSON.stringify(manifest, null, 2)
  const manifestHtml = await codeToHtml(manifestJson, {
    lang: 'json',
    theme: 'github-dark-default',
    structure: 'inline',
  })
  const installCommand = `xrmcp tool install ${tool.path.replace('.xrmcp.json', '')}`
  const installCommandHtml = await codeToHtml(installCommand, {
    lang: 'bash',
    theme: 'github-dark-default',
    structure: 'inline',
  })
  const downloadUrl = `/api/tools/manifest?path=${encodeURIComponent(tool.path)}&download=true`
  const githubManifestUrl = `https://github.com/xrmcp/registry/blob/main/xrmcp-registry/tools/${tool.path}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-30">
        <div className="mx-auto max-w-4xl px-6 pb-12">
          {/* Breadcrumb */}
          <Link
            href="/registry"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registry
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{tool.displayName}</h1>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{tool.name}</p>
              </div>
              <Badge
                variant="outline"
                className={`text-sm capitalize ${getCategoryColor(tool.category)}`}
              >
                <Folder className="mr-1.5 h-3.5 w-3.5" />
                {tool.category}
              </Badge>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">{tool.description}</p>

            {/* Tags */}
            {tool.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md bg-secondary/50 px-2.5 py-1 text-sm text-muted-foreground"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mb-8 py-4 flex flex-wrap gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={downloadUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Manifest
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border bg-transparent text-foreground hover:bg-secondary"
            >
              <a href={githubManifestUrl} target="_blank" rel="noopener noreferrer">
                View On GitHub
              </a>
            </Button>
          </div>

          {/* Install command */}
          <div className="mb-8 mt-4">
            <h2 className="mb-3 text-lg font-semibold text-foreground flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Install via CLI
            </h2>
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-3">
              <span className="font-mono text-sm text-primary">$</span>
              <code
                className="flex-1 overflow-x-auto font-mono text-sm leading-6"
                dangerouslySetInnerHTML={{ __html: installCommandHtml }}
              />
              <CopyButton text={installCommand} />
            </div>
          </div>

          {/* Manifest preview */}
          <div>
            <div className="mb-3 pt-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground pt-4">Manifest</h2>
              <CopyButton text={manifestJson} label="Copy JSON" />
            </div>
            <div className="gradient-border rounded-xl mb-4">
              <div className="rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    {tool.path}
                  </span>
                </div>
                <pre className="max-h-[500px] overflow-auto p-4 text-sm font-mono leading-6">
                  <code
                    className="font-mono"
                    dangerouslySetInnerHTML={{ __html: manifestHtml }}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
