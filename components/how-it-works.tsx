'use client'

import { motion } from 'framer-motion'
import { Terminal, Package, Play, ArrowRight } from 'lucide-react'

interface HowItWorksProps {
  highlightedSteps: string[]
}

const steps = [
  {
    number: '01',
    icon: Terminal,
    title: 'Start a Runtime',
    description: 'Install the CLI and start the xrMCP runtime server. Choose between stdio or HTTP transport.',
    code: `# Install via Homebrew
brew tap xrmcp/homebrew-tap
brew install xrmcp

# Start the runtime server
xrmcp server start -t http -p 8000`,
  },
  {
    number: '02',
    icon: Package,
    title: 'Install a Tool',
    description: 'Install tools from local manifests or directly from the public registry by name.',
    code: `# Install from the registry
xrmcp tool install jira/get_jira_ticket

# Or install a local manifest
xrmcp tool install ./my-tool.xrmcp.json

# Search for tools
xrmcp tool search github`,
  },
  {
    number: '03',
    icon: Play,
    title: 'AI Uses Your Tool',
    description: 'The runtime exposes the tool as a proper MCP tool. Any MCP-compatible AI can now use it with the right name, schema, and behaviour.',
    code: `# List installed tools
xrmcp tool ls

# The tool is now available to any MCP client
# Connect your AI agent to the runtime
# and it will discover the tool automatically`,
  },
]

export function HowItWorks({ highlightedSteps }: HowItWorksProps) {
  return (
    <section className="relative py-12 pt-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Getting Started
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps to install MCP tools with xrMCP and make them available to any AI.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-4xl font-bold gradient-text">{step.number}</span>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground text-lg">{step.description}</p>
                
              </div>
              <div className="flex-1">
                <div className="gradient-border rounded-xl">
                  <div className="rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                      <div className="h-3 w-3 rounded-full bg-red-500/60" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                      <div className="h-3 w-3 rounded-full bg-green-500/60" />
                      <span className="ml-2 font-mono text-xs text-muted-foreground">terminal</span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-sm leading-6">
                      <code
                        className="font-mono"
                        dangerouslySetInnerHTML={{ __html: highlightedSteps[index] ?? step.code }}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
