import { verifyToken } from '@/lib/auth';
import { MissionService } from '@/lib/services/MissionService';
import { NextResponse } from 'next/server';

export async function GET() {
    const user = await verifyToken();

    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const misiones = await MissionService.getMissionsByUserId(user.id);
    return NextResponse.json(misiones, { status: 200 });
}
