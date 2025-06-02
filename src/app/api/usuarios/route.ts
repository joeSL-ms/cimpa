import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { usuario, password } = await request.json();

  try {
    const res = await pool.query(
      'SELECT * FROM usuarios WHERE mail = $1',
      [usuario]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const dbUser = res.rows[0].id_usuario;
    const dbPassword = res.rows[0].clave;

    if (password === dbPassword) {
      const token = jwt.sign(
        { id: dbUser },
        process.env.JWT_SECRET!,
        { expiresIn: '6h' }
      );

      // ✅ Usa new NextResponse para poder establecer cookies correctamente
      const response = new NextResponse(JSON.stringify({
        message: 'Login exitoso',
        id_usuario: dbUser
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 6, // 6 horas
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

  } catch (err) {
    console.error('Error en el servidor:', err);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
