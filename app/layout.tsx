import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'xrMCP | Define MCP tools once, deploy everywhere',
  description:
    'xrMCP is a JSON manifest format and runtime protocol that lets you describe any API as a real, named MCP tool.',
  keywords: ['xrMCP', 'MCP', 'Model Context Protocol', 'JSON manifest', 'AI tools', 'Developer tools'],
  authors: [{ name: 'xrMCP' }],
  openGraph: {
    title: 'xrMCP | Define MCP tools once, deploy everywhere',
    description:
      'xrMCP is a JSON manifest format and runtime protocol that lets you describe any API as a real, named MCP tool.',
    type: 'website',
    siteName: 'xrMCP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xrMCP | Define MCP tools once, deploy everywhere',
    description:
      'xrMCP is a JSON manifest format and runtime protocol that lets you describe any API as a real, named MCP tool.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
