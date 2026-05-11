import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
             <img src="/xrmcp-sb.png" className="h-6 w-auto" />
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/registry" className="transition-colors hover:text-foreground">
              Registry
            </Link>
            <Link
              href="https://github.com/xrmcp"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} xrMCP. Open source.
          </p>
        </div>
      </div>
    </footer>
  )
}
