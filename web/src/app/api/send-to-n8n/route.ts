import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('[/api/send-to-n8n] Rota de API acessada.');
    const itemData = await request.json();
    console.log('[/api/send-to-n8n] Dados recebidos do frontend:', itemData);

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL; 
    console.log('[/api/send-to-n8n] N8N_WEBHOOK_URL:', n8nWebhookUrl);

    if (!n8nWebhookUrl) {
      console.error('[/api/send-to-n8n] Erro: N8N_WEBHOOK_URL não configurada.');
      return NextResponse.json({ message: 'N8N_WEBHOOK_URL não configurada.' }, { status: 500 });
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (n8nResponse.ok) {
      console.log('[/api/send-to-n8n] Dados enviados com sucesso para o n8n.');
      return NextResponse.json({ message: 'Dados enviados para o n8n com sucesso.' });
    } else {
      const n8nError = await n8nResponse.text();
      console.error('[/api/send-to-n8n] Falha ao enviar dados para o n8n:', n8nError);
      return NextResponse.json({ message: 'Falha ao enviar dados para o n8n.', error: n8nError }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[/api/send-to-n8n] Erro interno do servidor:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.', error: error.message }, { status: 500 });
  }
}
