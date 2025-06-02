import pool from '@/lib/db';

export class UserService {
  static async getUserById(id: string) {
    // Consulta BD y devuelve datos de usuario
  }
  static async getUserConsumo(id: string) {
    // Consulta BD y devuelve datos de usuario
    const res = await pool.query(
      `SELECT fecha,consumo
      FROM vista_usuario_viajes_consumo
      WHERE id_usuario = $1`,
      [id]
    )
    if (res.rows.length === 0) {
      throw new Error('No se encontraron misiones para el usuario');
    }

    return res.rows
  }
  static async getUserMisiones(id: string) {
    // Consulta BD y devuelve datos de usuario
    const res = await pool.query(
      `SELECT estado_mision, COUNT(*) AS cantidad_misiones
      FROM vista_usuarios_misiones
      WHERE id_usuario = $1
      GROUP BY estado_mision`,
      [id]
    )
    if (res.rows.length === 0) {
      throw new Error('No se encontraron misiones para el usuario');
    }

    return res.rows
  }
  static async setDataUser(
    id: string,
    nombre: string,
    apellido: string,
    correo: string
  ) {
    const query = `
    UPDATE usuarios
    SET 
      nombre = $1,
      apellido = $2,
      mail = $3
    WHERE id_usuario = $4
  `;

    const values = [nombre, apellido, correo, id];

    try {
      const res = await pool.query(query, values);
      return res;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  }

}

