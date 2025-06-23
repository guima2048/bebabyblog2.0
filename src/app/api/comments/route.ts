import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const commentsFilePath = path.join(process.cwd(), 'src/data', 'comments.json');
const notificationsFilePath = path.join(process.cwd(), 'src/data', 'notificacoes.json');

interface GeoData {
    query?: string;
    status?: string;
    country?: string;
    countryCode?: string;
    region?: string;
    regionName?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    isp?: string;
    org?: string;
    as?: string;
}

interface Comment {
    id: string;
    slug: string;
    nome: string;
    email: string;
    telefone: string;
    texto: string;
    data: string;
    status: 'pendente' | 'aprovado' | 'rejeitado';
    ip?: string;
    geo?: GeoData;
}

async function getComments(): Promise<Comment[]> {
    try {
        await fs.access(commentsFilePath);
        const data = await fs.readFile(commentsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveComments(comments: Comment[]) {
    await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2));
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const all = searchParams.get('all');
    const status = searchParams.get('status');

    const comments = await getComments();

    if (all === 'true') {
        if (status && status !== 'todos') {
            return NextResponse.json(comments.filter(c => c.status === status));
        }
        return NextResponse.json(comments);
    }

    if (slug) {
        const postComments = comments.filter(c => c.slug === slug && c.status === 'aprovado');
        const publicComments = postComments.map(({ nome, texto, data }) => ({ nome, texto, data }));
        return NextResponse.json(publicComments);
    }

    return NextResponse.json({ error: 'Filtro inválido' }, { status: 400 });
}

export async function POST(req: NextRequest) {
    const { slug, nome, email, telefone, texto } = await req.json();

    if (!slug || !nome || !email || !telefone || !texto) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    
    let ip = req.headers.get('x-forwarded-for');

    // Se o IP for local, busca o IP público para um teste mais preciso
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        try {
            const ipifyRes = await fetch('https://api.ipify.org?format=json');
            if (ipifyRes.ok) {
                const ipifyData = await ipifyRes.json();
                ip = ipifyData.ip;
            } else {
                ip = null; // Evita usar um IP de fallback se a busca falhar
            }
        } catch (error) {
            console.error("Erro ao buscar IP público para teste:", error);
            ip = null;
        }
    }

    let geo: GeoData = {};
    if (ip) {
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
            if (geoRes.ok) {
                geo = await geoRes.json();
            }
        } catch (error) {
            console.error("Erro ao buscar geolocalização:", error);
        }
    }

    const comments = await getComments();
    
    const existingComment = comments.find(c => c.slug === slug && (c.email === email || c.telefone === telefone));
    if (existingComment) {
        return NextResponse.json({ error: 'Você já enviou um comentário para este post com este e-mail ou telefone.' }, { status: 409 });
    }

    const newComment: Comment = {
        id: uuidv4(),
        slug,
        nome,
        email,
        telefone,
        texto,
        data: new Date().toISOString(),
        status: 'pendente',
        ip: ip || 'IP não encontrado',
        geo,
    };

    comments.push(newComment);
    await saveComments(comments);

    return NextResponse.json(newComment, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { id, status } = await req.json();

    if (!id || !status || !['aprovado', 'rejeitado'].includes(status)) {
        return NextResponse.json({ error: 'Dados inválidos para atualização.' }, { status: 400 });
    }

    const comments = await getComments();
    const commentIndex = comments.findIndex(c => c.id === id);

    if (commentIndex === -1) {
        return NextResponse.json({ error: 'Comentário não encontrado.' }, { status: 404 });
    }

    comments[commentIndex].status = status;
    await saveComments(comments);

    return NextResponse.json(comments[commentIndex]);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID do comentário é obrigatório.' }, { status: 400 });
    }

    const comments = await getComments();
    const filteredComments = comments.filter(c => c.id !== id);

    if (comments.length === filteredComments.length) {
        return NextResponse.json({ error: 'Comentário não encontrado.' }, { status: 404 });
    }

    await saveComments(filteredComments);

    return new NextResponse(null, { status: 204 });
} 