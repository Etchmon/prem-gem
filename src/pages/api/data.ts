import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

console.log(pool.connect());

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */


export default async function fantasyData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch(
      'https://fantasy.premierleague.com/api/bootstrap-static/',
    )
    const data = await response.json()
    const playerList = data.elements

    // Inster player data into the PostgreSQL database
    await Promise.all(
      playerList.map(async (player: any) => {
        try {
          const team = await data.teams[player.team].name;
          const query = 'INSERT INTO prem_player.player (first_name, second_name, team, minutes, goals_scored, assists, clean_sheets, goals_conceded, own_goals, penalties_saved, penalties_missed, yellow_cards, red_cards, saves, influence, creativity, threat, starts, x_goals, x_assists, x_goal_involvements, x_goals_conceded, x_goals_per_90, saves_per_90, x_assists_per_90, x_goal_involvements_per_90, x_goals_conceded_per_90, goals_conceded_per_90, starts_per_90, clean_sheets_per_90) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)';
          const values = [
            player.first_name,
            player.second_name,
            team,
            player.minutes,
            player.goals_scored,
            player.assists,
            player.clean_sheets,
            player.goals_conceded,
            player.own_goals,
            player.penalties_saved,
            player.penalties_missed,
            player.yellow_cards,
            player.red_cards,
            player.saves,
            player.influence,
            player.creativity,
            player.threat,
            player.starts,
            player.expected_goals,
            player.expected_assists,
            player.expected_goal_involvements,
            player.expected_goals_conceded,
            player.expected_goals_per_90,
            player.saves_per_90,
            player.expected_assists_per_90,
            player.expected_goal_involvements_per_90,
            player.expected_goals_conceded_per_90,
            player.goals_conceded_per_90,
            player.starts_per_90,
            player.clean_sheets_per_90
          ];

          await pool.query(query, values);
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      }),
    );
    res.status(200).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Error fetching data' })
  }
}
