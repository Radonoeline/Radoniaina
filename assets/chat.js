export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { message, model = 'gpt2' } = req.body;

  if (!message) return res.status(400).json({ error: 'Message requis' });

  try {
    const HF_TOKEN = process.env.HF_TOKEN; // clé cachée sur Vercel
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();
    let reply = (data[0]?.generated_text) || data.generated_text || 'Pas de réponse';
    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
