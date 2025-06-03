import pool from '@/lib/db';

export class MissionService {
    static async getMissionsByUserId(userId: string) {
        const res = await pool.query(
            `SELECT "id_mision","nombre_mision","descripcion_mision","estado_mision" 
            FROM vista_usuarios_misiones 
            WHERE id_usuario = $1`,
            [userId]
        );

        if (res.rows.length === 0) {
            throw new Error('No se encontraron misiones para el usuario');
        }

        return res.rows
    }
}
