import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center pt-20">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold gradient-text">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">Tool Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The tool you&apos;re looking for doesn&apos;t exist in the registry.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="outline" className="border-border bg-transparent hover:bg-secondary text-foreground">
              <Link href="/registry">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Registry
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
