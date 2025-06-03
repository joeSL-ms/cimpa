import { verifyToken } from '@/lib/auth';
import { UserService } from '@/lib/services/UserService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const user = await verifyToken();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { nombre, apellido, correo } = await request.json();
    console.log("Datos recibidos:", { nombre, apellido, correo });
    if (!nombre || !apellido || !correo) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }
    console.log("Datos recibidos:", { nombre, apellido, correo });
    await UserService.setDataUser(
      user.id,
      nombre,
      apellido,
      correo,
    );

    return NextResponse.json(
      { message: "Usuario actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en POST /api/user/edit:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
