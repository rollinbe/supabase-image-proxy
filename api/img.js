export default async function handler(req, res) {
  const { name } = req.query;
  if (!name) return res.status(400).send('Missing "name" param');

  const url = `https://aodutymnszzydlkbrnbh.supabase.co/storage/v1/object/public/pmmlogospublic/${name}`;

  const response = await fetch(url);
  if (!response.ok) return res.status(502).send('Supabase fetch failed');

  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  const buffer = await response.arrayBuffer();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Content-Type', contentType);
  res.send(Buffer.from(buffer));
}

