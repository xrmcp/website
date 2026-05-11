'use client'

import { motion } from 'framer-motion'
import { FileJson, Database, Terminal, Code2, Globe } from 'lucide-react'
import Link from 'next/link'

const components = [
  {
    icon: FileJson,
    name: 'xrmcp/xrmcp',
    description: 'Specification',
    status: 'Core',
    href: 'https://github.com/xrmcp/xrmcp',
  },
  {
    icon: Code2,
    name: 'xrmcp/go-sdk',
    description: 'Go SDK',
    status: 'Available',
    href: 'https://github.com/xrmcp/go-sdk',
  },
  {
    icon: Code2,
    name: 'xrmcp/python-sdk',
    description: 'Python SDK',
    status: 'Available',
    href: 'https://github.com/xrmcp/python-sdk',
  },
  {
    icon: Terminal,
    name: 'xrmcp/cli',
    description: 'CLI — xrmcp server start, xrmcp tool install',
    status: 'Available',
    href: 'https://github.com/xrmcp/cli',
  },
  {
    icon: Database,
    name: 'xrmcp/registry',
    description: 'Public tool registry',
    status: 'Available',
    href: 'https://github.com/xrmcp/registry',
    internal: false
  },
]

export function Ecosystem() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            The <span className="gradient-text">xrMCP Ecosystem</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
           Everything you need to install and share AI tools. xrMCP is fully open source and available on GitHub. Spec v0.1.0 is in active development — join the community, contribute, and help shape the future of portable MCP tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {components.map((component, index) => {
            const Wrapper = component.internal ? Link : 'a'
            const wrapperProps = component.internal 
              ? { href: component.href }
              : { href: component.href, target: '_blank', rel: 'noopener noreferrer' }
            
            return (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="group block relative rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 h-full"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <component.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground font-mono text-sm">{component.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-primary">
                    {component.status}
                  </span>
                </Wrapper>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
