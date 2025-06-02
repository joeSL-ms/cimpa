import { verifyToken } from '@/lib/auth';
import { AnnotationService } from '@/lib/services/AnnotationService';
import { NextResponse } from 'next/server';

export async function GET() {
    const user = await verifyToken();

    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const annotations = await AnnotationService.getAnnotationsByUserId(user.id);

    const annotationsWithFormattedDate = annotations.map(item => ({
        ...item,
        fecha_anotacion: new Date(item.fecha_anotacion).toLocaleDateString('es-ES')
    }));
    return NextResponse.json(annotationsWithFormattedDate, { status: 200 });
}
