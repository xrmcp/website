import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToolBrowser } from '@/components/tool-browser'
import { METADATA_URL, type RegistryMetadata } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'Registry - xrMCP',
  description: 'Browse and download pre-built AI tool manifests from the xrMCP registry.',
}

async function getTools(): Promise<RegistryMetadata> {
  try {
    const response = await fetch(METADATA_URL, {
      next: { revalidate: 3600 },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch registry')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching tools:', error)
    return { version: '1', tools: [] }
  }
}

export default async function RegistryPage() {
  const registry = await getTools()

  return (
    <div className="flex min-h-screen flex-col" >
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 pt-30">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Tool <span className="gradient-text">Registry</span>
            </h1>
            <p className="mt-3 mb-2 text-lg text-muted-foreground">
              Browse and install pre-built tool manifests for your AI applications.
            </p>
          </div>

          <ToolBrowser tools={registry.tools} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
