export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, firstName, lastName } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const response = await fetch(
    'https://api.resend.com/audiences/c8389e93-ab66-46d9-84ea-9f5d7ac636fb/contacts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        first_name: firstName || '',
        last_name: lastName || '',
        unsubscribed: false,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ success: true });
}
