'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, ChevronRight, Tag, Folder, Terminal, Check } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type ToolMetadata, getCategoryColor, getInstallCommand } from '@/lib/registry'

interface ToolBrowserProps {
  tools: ToolMetadata[]
}

export function ToolBrowser({ tools }: ToolBrowserProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
const [copiedTool, setCopiedTool] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    tools.forEach((tool) => cats.add(tool.category))
    return Array.from(cats).sort()
  }, [tools])

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.displayName.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = selectedCategory === null || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [tools, search, selectedCategory])

  const handleDownload = (tool: ToolMetadata) => {
    const downloadUrl = `/api/tools/manifest?path=${encodeURIComponent(tool.path)}&download=true`
    window.open(downloadUrl, '_blank')
  }

  const handleCopyInstall = async (tool: ToolMetadata) => {
    const command = `xrmcp tool install ${getInstallCommand(tool.path)}`
    await navigator.clipboard.writeText(command)
    setCopiedTool(tool.path)
    setTimeout(() => setCopiedTool(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools by name, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{filteredTools.length} tools</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
            selectedCategory === null
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
          }`}
        >
          <Folder className="h-3.5 w-3.5" />
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
              selectedCategory === category
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            <Folder className="h-3.5 w-3.5" />
            {category}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="group relative flex flex-col rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{tool.displayName}</h3>
                {/* <p className="mt-0.5 font-mono text-xs text-muted-foreground truncate">{tool.name}</p> */}
              </div>
              {/* <Badge 
                variant="outline" 
                className={`shrink-0 text-xs capitalize ${getCategoryColor(tool.category)}`}
              >
                {tool.category}
              </Badge> */}
            </div>

            <p className="flex-1 text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>

            {tool.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{tool.tags.length - 3}</span>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              {/* <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(tool)}
                className="flex-1 border-border bg-transparent hover:bg-secondary text-foreground"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </Button> */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopyInstall(tool)}
                className="flex-1 border-border bg-transparent hover:bg-secondary text-foreground"
              >
                {copiedTool === tool.path ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                    Copied 
                    {/* <span className="ml-1 font-mono text-xs text-muted-foreground">{getInstallCommand(tool.path)}</span> */}
                  </>
                ) : (
                  <>
                    <Terminal className="mr-1.5 h-3.5 w-3.5" />
                    Install
                  </>
                )}
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href={`/registry/${tool.path.replace('.xrmcp.json', '')}`}>
                  View
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tools found matching your criteria.</p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedCategory(null)
            }}
            className="mt-2 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
