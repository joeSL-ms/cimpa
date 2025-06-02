import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface TokenPayload {
    id: string;
}

export async function verifyToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

