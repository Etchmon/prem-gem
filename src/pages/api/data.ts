import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */

export default async function fantasyData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data = await response.json();
    const playerList = data.elements;
    const playerNames = playerList.forEach((element: any) => {
      console.log(element.first_name, element.second_name);
    });
    // Pull Player data out from json
    // Use players name to scrape transfermarkt data
    // Create new model for Player Schema
    // Add data from API and transfermarkt to new player model
    // Insert player into database


    // Player keys 
    // first_name, second_name, form, photo, club, nationality, dominant_foot, weak_foot, avg_minutes_P90, injury_history, dominant_position, all_positions, minutes_played, goals, assists, gpm, apm, gcpm, own_goals, penalties_saved, penalties_missed, yellow_cards, red_cards, saves, influence, creativity, threat, starts, xG, xA, xGI, xGC, xGP90, saves_per90, xAP90, xGIP90, xGCP90, goals_conceded_P90, pass_attempts, pass_completed, pass_completed_percent, short_pass_attempts, short_pass_completed, short_pass_percent, medium_pass_attempts, medium_pass_completed, medium_pass_percent, long_pass_attempts, long_pass_completed, long_pass_percent, key_passes, final_third_passes, passes_into_penalty, crosses_into_penalty, progressive_passes, shots_total, shots_on_target, shots_ot_percent, shots_P90, shots_ot_P90, goals_per_shot, goals_per_ot_shot, avg_shot_distance, fk_shots, pk_made, pk_attempts, xG, non_pen_xG, non_pen_xG_per_shot, goals_minus_xG, non_pen_goals_minus_xG

    res.status(200).json(playerList);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


