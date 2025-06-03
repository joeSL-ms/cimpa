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

  static async getWalletTotal(userId: string) {
    const res = await pool.query(
      `SELECT SUM(puntos_otorgados) AS puntos_acumulados
       FROM puntuaciones
       WHERE usuario_id = $1
       `,
      [userId]
    );

    if (res.rows.length === 0) {
      throw new Error('No se encontraron puntos acumulados para el usuario');
    }

    return  Number(res.rows[0]?.puntos_acumulados ?? 0);
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

  static async getWalletIngresosTotal(userId: string): Promise<number> {
    const res = await pool.query(
      `
      SELECT COALESCE(SUM(puntos_otorgados), 0) AS ingreso_total
      FROM puntuaciones
      WHERE usuario_id = $1 AND puntos_otorgados > 0
    `,
      [userId]
    );

    return Number(res.rows[0]?.ingreso_total ?? 0);
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

  static async getWalletGastosTotal(userId: string) {
    const res = await pool.query(
      `SELECT COALESCE(SUM(puntos_otorgados), 0) as gastosTotal
       FROM puntuaciones
       WHERE usuario_id = $1 AND puntos_otorgados < 0
       `,
      [userId]
    );

    return Number(res.rows[0]?.gastostotal ?? 0);
  }
}
