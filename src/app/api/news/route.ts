import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'technology';
  const page = searchParams.get('page');

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error("NEWS_API_KEY is not set in environment variables");
    return NextResponse.json({ error: 'News API key not configured' }, { status: 500 });
  }

  const url = new URL('https://newsdata.io/api/1/news');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('q', q);
  url.searchParams.set('language', 'en'); // default to english for better initial state
  
  if (page) {
    url.searchParams.set('page', page);
  }

  try {
    const response = await fetch(url.toString(), {
      // Small cache to prevent burning through API limits on rapid reloads
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Upstream API Error: ${response.status} ${errorData}`);
      return NextResponse.json(
        { error: 'Failed to fetch news', details: errorData }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Internal server error while fetching news' }, { status: 500 });
  }
}
