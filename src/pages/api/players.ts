import pool from "../../../graphql/db";

export default async function getAllPlayers(req: any, res: any) {
  const client = await pool.connect();
  try {
    const result = await pool.query("SELECT * FROM player_stats");
    console.log(result.rows);
    return res.status(200).json(result.rows);
  } finally {
    client.release();
  }
}
