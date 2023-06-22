import {Pool} from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

export default pool;

export async function query(sql: string, params?: any[]): Promise<any> {
  const client = await pool.connect();

  try {
    const result = await client.query({
      text: sql,
      values: params || [],
    });
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw new Error('An error occurred while executing the query.');
  } finally {
    client.release();
  }
}