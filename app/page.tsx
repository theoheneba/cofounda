async function getRecentStartups() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/recent-startups`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch recent startups');
  return res.json();
}

