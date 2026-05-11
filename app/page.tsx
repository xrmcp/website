import { codeToHtml } from 'shiki'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Ecosystem } from '@/components/ecosystem'
import { CTA } from '@/components/cta'
import { terminalCommands } from '@/lib/homepage-code'

const heroPreviewCode = `{
  "tool": {
    "schemaVersion": "xrmcp.v0.1.0",
    "name": "get_blog_post",
    "description": "Fetch a blog post by its ID.",
    "inputSchema": {...},
    "executions": [{
      "type": "api",
      "request": {
        "method": "GET",
        "url": "https://api.example.com/posts/{{input.postId}}"
      }
    }]
  }
}`

const howItWorksCodeSnippets = [
  `# Install via Homebrew
brew tap xrmcp/homebrew-tap
brew install xrmcp

# Start the runtime server
xrmcp server start -t http -p 8000`,
  `# Install from the registry
xrmcp tool install jira/get_jira_ticket

# Or install a local manifest
xrmcp tool install ./my-tool.xrmcp.json

# Search for tools
xrmcp tool search github`,
  `# List installed tools
xrmcp tool ls

# The tool is now available to any MCP client
# Connect your AI agent to the runtime
  # and it will discover the tool automatically`,
]

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export default async function Home() {
  const heroPreviewHtml = await codeToHtml(heroPreviewCode, {
    lang: 'json',
    theme: 'github-dark-default',
    structure: 'inline',
  })
  const terminalCommandsHtml = await Promise.all(
    terminalCommands.map((command) => {
      if (command.prefix === '#') {
        return Promise.resolve(escapeHtml(command.text))
      }

      return codeToHtml(command.text, {
        lang: 'bash',
        theme: 'github-dark-default',
        structure: 'inline',
      })
    })
  )
  const howItWorksHighlightedSteps = await Promise.all(
    howItWorksCodeSnippets.map((code) =>
      codeToHtml(code, {
        lang: 'bash',
        theme: 'github-dark-default',
        structure: 'inline',
      })
    )
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero previewHtml={heroPreviewHtml} terminalCommandsHtml={terminalCommandsHtml} />
        <Features />
        <HowItWorks highlightedSteps={howItWorksHighlightedSteps} />
        <Ecosystem />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
