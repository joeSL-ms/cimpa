import pool from '@/lib/db';

export class WalletService {
  static async getWalletAcumulado(userId: string) {
    const res = await pool.query(
      `SELECT fecha, SUM(puntos_otorgados) OVER(ORDER BY fecha) AS puntos_acumulados
       FROM puntuaciones
       WHERE usuario_id = $1
       ORDER BY fecha`,
      [userId]
    );

    if (res.rows.length === 0) {
      throw new Error('No se encontraron puntos acumulados para el usuario');
    }

    return res.rows;
  }

  static async getWalletIngresos(userId: string) {
    const res = await pool.query(
      `SELECT puntos_otorgados, fecha
       FROM puntuaciones
       WHERE usuario_id = $1 AND puntos_otorgados > 0
       ORDER BY fecha`,
      [userId]
    );

    if (res.rows.length === 0) {
      throw new Error('No se encontraron ingresos para el usuario');
    }

    return res.rows;
  }

  static async getWalletGastos(userId: string) {
    const res = await pool.query(
      `SELECT puntos_otorgados, fecha
       FROM puntuaciones
       WHERE usuario_id = $1 AND puntos_otorgados < 0
       ORDER BY fecha`,
      [userId]
    );

    if (res.rows.length === 0) {
      throw new Error('No se encontraron gastos para el usuario');
    }

    return res.rows;
  }
}
