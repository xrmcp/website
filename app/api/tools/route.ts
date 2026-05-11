import { NextResponse } from 'next/server'
import { METADATA_URL, type RegistryMetadata } from '@/lib/registry'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    const response = await fetch(METADATA_URL, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch registry metadata' },
        { status: response.status }
      )
    }

    const data: RegistryMetadata = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching registry metadata:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
