'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function CTA() {
  const [copied, setCopied] = useState(false)
  const installCommand = 'brew tap xrmcp/homebrew-tap && brew install xrmcp'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Ready to use MCP Tools <span className="gradient-text">without coding a server</span>?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Start by browsing the registry or install the CLI.
            Describe your tool once in JSON, install it anywhere.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
              <Link href="/registry">
                Explore Registry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border bg-transparent hover:bg-secondary text-foreground">
              <Link href="https://github.com/xrmcp/cli" target="_blank" rel="noopener noreferrer">
                CLI Documentation
              </Link>
            </Button>
          </div>

          {/* Quick install */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <p className="mb-3 text-sm text-muted-foreground">Install via Homebrew</p>
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-5 py-3 font-mono text-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <span className="text-primary">$</span>
              <span className="text-foreground">{installCommand}</span>
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              Also available via{' '}
              <Link href="https://github.com/xrmcp/cli#installation" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Scoop, Debian packages, or install script
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
