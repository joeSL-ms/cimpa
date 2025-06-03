import pool from '@/lib/db';

export class AnnotationService {
  static async getAnnotationsByUserId(userId: string) {
    try {
      // Primero obtenemos el id_departamento del usuario
      const res = await pool.query(
        `SELECT id_departamento 
        FROM usuarios 
        WHERE id_usuario = $1`,
        [userId]
      );

      const idDepartamento = res.rows[0]?.id_departamento;

      if (!idDepartamento) {
        throw new Error('Departamento no encontrado para el usuario');
      }

      // Luego obtenemos las anotaciones de ese departamento
      const anotaciones = await pool.query(
        `SELECT titulo_anotacion, fecha_anotacion 
        FROM vista_anotaciones_completa 
        WHERE id_departamento = $1`,
        [idDepartamento]
      );

      return anotaciones.rows;
    } catch (error) {
      console.error('Error al obtener anotaciones:', error);
      throw error;
    }
  }
}
