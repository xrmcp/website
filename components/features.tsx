'use client'

import { motion } from 'framer-motion'
import { FileJson, Zap, Server, Code2, Database, Shield } from 'lucide-react'

const features = [
  {
    icon: FileJson,
    title: 'Portable Manifests',
    description: 'Describe your tool once in JSON, install it anywhere. No more deploying hardcoded servers.',
  },
  {
    icon: Zap,
    title: 'Install on Demand',
    description: 'One runtime, install tools as needed. Like browser extensions for AI.',
  },
  {
    icon: Server,
    title: 'No Server Required',
    description: 'Share a .xrmcp.json file instead of shipping infrastructure to deploy and manage.',
  },
  {
    icon: Code2,
    title: 'Standard Format',
    description: '*.xrmcp.json — validated, portable manifests that are easy to read and version control.',
  },
  {
    icon: Database,
    title: 'Public Registry',
    description: 'Browse and download pre-built tool manifests from our open registry.',
  },
  {
    icon: Shield,
    title: 'Declared Permissions',
    description: 'Network access and risk levels are explicit in the manifest for transparency.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
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
            Why <span className="gradient-text">xrMCP</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
         Today, sharing an MCP integration means sharing an entire server — not just a tool. People who want to share integrations need to build, host, maintain, and distribute MCP servers. xrMCP changes that with a portable manifest format that turns integrations into installable tools. Developers can share tools directly with the community, and anyone can install them instantly from an xrMCP-compatible runtime — no deployment, no infrastructure, no technical expertise required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
