export interface ToolManifest {
  tool: {
    schemaVersion: string
    name: string
    description: string
    type: string
    inputSchema: {
      type: string
      properties: Record<string, unknown>
      required?: string[]
    }
    executions: Array<{
      type: string
      request: {
        method: string
        url: string
        headers?: Record<string, string>
        body?: unknown
      }
    }>
    permissions?: {
      network?: string[]
      risk?: string
    }
    configSchema?: {
      type: string
      properties: Record<string, unknown>
      required?: string[]
    }
  }
}

export interface ToolMetadata {
  name: string
  displayName: string
  description: string
  category: string
  tags: string[]
  path: string
}

export interface RegistryMetadata {
  version: string
  tools: ToolMetadata[]
}

export const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/xrmcp/registry/main/xrmcp-registry/tools'
export const METADATA_URL = `${REGISTRY_BASE_URL}/metadata.json`

export function getManifestUrl(path: string): string {
  return `${REGISTRY_BASE_URL}/${path}`
}

export function getInstallCommand(path: string): string {
  // Convert path like "jira/get_jira_ticket.xrmcp.json" to "jira/get_jira_ticket"
  return path.replace('.xrmcp.json', '')
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    jira: '🎫',
    gitlab: '🦊',
    github: '🐙',
    jsonplaceholder: '📋',
    rest: '🌐',
    database: '🗄️',
    ai: '🤖',
    default: '⚡',
  }
  return icons[category.toLowerCase()] || icons.default
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    jira: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    gitlab: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    github: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    jsonplaceholder: 'bg-green-500/20 text-green-400 border-green-500/30',
    rest: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    ai: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    default: 'bg-primary/20 text-primary border-primary/30',
  }
  return colors.default //juste return default color for now, diff colors later
}
