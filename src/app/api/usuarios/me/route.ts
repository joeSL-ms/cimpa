import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

        const result = await pool.query(
            'SELECT * FROM vista_usuarios_completa WHERE "ID_Usuario" = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ usuario: result.rows[0] },
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
    } catch {
        return NextResponse.json({ error: 'Error al obtener la cartera' }, { status: 500 });
    }
}
