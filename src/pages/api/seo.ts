import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
// pages/api/seo.ts (temporário até implementar gravação real)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { googleVerification, gaId } = req.body;

    if (!googleVerification || !gaId) {
      return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    const seoConfig = `
export const siteSEO = {
  googleVerification: '${googleVerification}',
  gaId: '${gaId}',
};
`;

    const filePath = path.join(process.cwd(), 'src', 'config', 'seo.ts');

    try {
      fs.writeFileSync(filePath, seoConfig, 'utf8');
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Erro ao salvar seo.ts', err);
      return res.status(500).json({ error: 'Erro ao salvar config' });
    }
  }
  res.status(405).end();
} 