import { NextResponse } from 'next/server';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'News API key not configured' }, { status: 500 });
  }

  const url = new URL('https://newsdata.io/api/1/news');
  url.searchParams.set('apikey', apiKey);
  // Newsdata uses id= to fetch a specific article
  url.searchParams.set('id', id);

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 60 } });
    
    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: 'Failed to fetch article details', details: errorData }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Internal server error while fetching article' }, { status: 500 });
  }
}
