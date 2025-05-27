export default async function handler(req, res) {
  const { url } = req;
  const name = url.split('/img/')[1];

  if (!name) return res.status(400).send('Missing image name');

  const supabaseUrl = `https://aodutymnszzydlkbrnbh.supabase.co/storage/v1/object/public/pmmlogospublic/${name}`;

  const response = await fetch(supabaseUrl);
  if (!response.ok) return res.status(502).send('Supabase fetch failed');

  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  const buffer = await response.arrayBuffer();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Content-Type', contentType);
  res.send(Buffer.from(buffer));
}

