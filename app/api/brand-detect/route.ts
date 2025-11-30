import { NextResponse } from 'next/server';
import { detectBrandFromUrl } from '@/lib/brand-detector';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Detect brand information
    const brandInfo = await detectBrandFromUrl(url);

    return NextResponse.json(brandInfo);
  } catch (error) {
    console.error('Error in brand detection API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to detect brand information',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
