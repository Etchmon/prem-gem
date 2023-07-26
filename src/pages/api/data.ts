import { NextApiRequest, NextApiResponse } from 'next'
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: 'postgresql://etchmon'
// })

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

    // Insert player data into the PostgreSQL database
    await Promise.all(
      playerList.map(async (player: any) => {
        const team = data.teams[player.team].name
        console.log(
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
          player.clean_sheets_per_90,
        );

        // const client = await pool.connect();
        // try {
        //   const query = 'INSERT INTO player (first_name, second_name, ...) VALUES ($1, $2)';
        //   const values = [player.first_name, player.second_name];
        // } catch (error) {
        //   console.error('Error inserting data:', error);

        // }
      }),
    )

    res.status(200).json(playerList)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Error fetching data' })
  }
}
