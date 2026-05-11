'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Copy, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { terminalCommands } from '@/lib/homepage-code'

interface HeroProps {
  previewHtml: string
  terminalCommandsHtml: string[]
}

interface TerminalShowcaseProps {
  highlightedCommands: string[]
}

function TerminalShowcase({ highlightedCommands }: TerminalShowcaseProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    const command = terminalCommands[currentLine]
    let charIndex = 0
    let nextLineTimeout: ReturnType<typeof setTimeout> | undefined

    setVisibleChars(0)

    const typingInterval = setInterval(() => {
      if (charIndex < command.text.length) {
        charIndex += 1
        setVisibleChars(charIndex)
      } else {
        clearInterval(typingInterval)
        nextLineTimeout = setTimeout(() => {
          setCurrentLine((prev) => (prev + 1) % terminalCommands.length)
        }, 1500)
      }
    }, 50)

    return () => {
      clearInterval(typingInterval)
      if (nextLineTimeout) {
        clearTimeout(nextLineTimeout)
      }
    }
  }, [currentLine])

  const command = terminalCommands[currentLine]
  const isComment = command.prefix === '#'
  const longestCommand = terminalCommands.reduce((a, b) =>
    a.text.length > b.text.length ? a : b
  )
  const textClassName = isComment ? 'text-muted-foreground/50 italic' : 'text-foreground'
  const currentCommandHtml = highlightedCommands[currentLine] ?? command.text
  const displayedText = command.text.slice(0, visibleChars)
  const revealPercent = command.text.length === 0 ? 0 : (visibleChars / command.text.length) * 100
  const revealWidth = `${revealPercent}%`
  const cursorOffset = visibleChars === 0 ? '0px' : 'calc(100% - 0.125rem)'

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="mx-auto flex w-full max-w-3xl items-start gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3 text-left font-mono text-sm backdrop-blur-sm sm:px-5">
        <span className={isComment ? 'text-muted-foreground/50' : 'text-primary'}>{command.prefix}</span>
        <div className="min-w-0 flex-1">
          <span className={`block whitespace-pre-wrap break-words sm:hidden ${textClassName}`}>
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="ml-0.5 inline-block h-4 w-1.5 align-middle bg-primary"
            />
          </span>
          <span className="relative hidden sm:block">
            <span aria-hidden="true" className="invisible whitespace-nowrap">
              {longestCommand.text}
            </span>
            <span className="absolute left-0 top-0 overflow-hidden whitespace-nowrap" style={{ width: revealWidth }}>
              <span
                className={`block whitespace-nowrap ${textClassName}`}
                dangerouslySetInnerHTML={{ __html: currentCommandHtml }}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function Hero({ previewHtml, terminalCommandsHtml }: HeroProps) {
  
  return (
    <section className="relative min-h-[90vh]  pt-30">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-lg backdrop-blur-sm"
          >
            <Package className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Extended Reality of MCP</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <span className="block">Define MCP tools once,</span>
            <span className="gradient-text glow-text">deploy everywhere</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            xrMCP is a JSON manifest format and runtime protocol that lets you describe any API as a real, named MCP tool.
            Instead of shipping a server, you share a <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-primary">.xrmcp.json</code> file.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
              <Link href="/registry">
                Browse Registry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border bg-transparent hover:bg-secondary text-foreground">
              <Link href="https://github.com/xrmcp" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </motion.div>

          {/* Terminal Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-4"
          >
            <TerminalShowcase highlightedCommands={terminalCommandsHtml} />
          </motion.div>



          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="my-6 w-full max-w-3xl"
          >

            <div className="gradient-border rounded-xl">
              <div className="rounded-xl bg-card/80 backdrop-blur-sm p-1">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">get_blog_post.xrmcp.json</span>
                </div>
                <pre className="overflow-x-auto p-4 text-left font-mono text-sm leading-6">
                  <code
                    className="font-mono"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
