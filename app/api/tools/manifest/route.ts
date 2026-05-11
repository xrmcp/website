import { NextRequest, NextResponse } from 'next/server'
import { getManifestUrl } from '@/lib/registry'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const download = searchParams.get('download') === 'true'

  if (!path) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    )
  }

  // Validate path to prevent directory traversal
  if (path.includes('..') || path.startsWith('/')) {
    return NextResponse.json(
      { error: 'Invalid path' },
      { status: 400 }
    )
  }

  try {
    const manifestUrl = getManifestUrl(path)
    const response = await fetch(manifestUrl, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Manifest not found' },
        { status: 404 }
      )
    }

    const manifest = await response.json()
    
    const headers: HeadersInit = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    }

    if (download) {
      const filename = path.split('/').pop() || 'manifest.xrmcp.json'
      headers['Content-Disposition'] = `attachment; filename="${filename}"`
      headers['Content-Type'] = 'application/json'
    }

    return NextResponse.json(manifest, { headers })
  } catch (error) {
    console.error('Error fetching manifest:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
