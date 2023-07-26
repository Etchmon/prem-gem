import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../graphql/db";
/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */

export default async function fantasyData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = await response.json();
    const playerList = data.elements;

    // Insert player data into the PostgreSQL database
    await Promise.all(
      playerList.map(async (player: any) => {
        try {
          // const team = await data.teams[player.team].name;
          const query = `INSERT INTO player_stats (chance_of_playing_next_round, chance_of_playing_this_round, code, cost_change_event, cost_change_event_fall, cost_change_start, cost_change_start_fall, dreamteam_count, element_type, ep_next, ep_this, event_points, first_name, form, id, in_dreamteam, news, news_added, now_cost, photo, points_per_game, second_name, selected_by_percent, special, squad_number, status, team, team_code, total_points, transfers_in, transfers_in_event, transfers_out, transfers_out_event, value_form, value_season, web_name, minutes, goals_scored, assists, clean_sheets, goals_conceded, own_goals, penalties_saved, penalties_missed, yellow_cards, red_cards, saves, bonus, bps, influence, creativity, threat, ict_index, starts, expected_goals, expected_assists, expected_goal_involvements, expected_goals_conceded, influence_rank, influence_rank_type, creativity_rank, creativity_rank_type, threat_rank, threat_rank_type, ict_index_rank, ict_index_rank_type, corners_and_indirect_freekicks_order, corners_and_indirect_freekicks_text, direct_freekicks_order, direct_freekicks_text, penalties_order, penalties_text, expected_goals_per_90, saves_per_90, expected_assists_per_90, expected_goal_involvements_per_90, expected_goals_conceded_per_90, goals_conceded_per_90, now_cost_rank, now_cost_rank_type, form_rank, form_rank_type, points_per_game_rank, points_per_game_rank_type, selected_rank, selected_rank_type, starts_per_90, clean_sheets_per_90) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84, $85, $86, $87, $88)`;

          const values = [
            player.chance_of_playing_next_round,
            player.chance_of_playing_this_round,
            player.code,
            player.cost_change_event,
            player.cost_change_event_fall,
            player.cost_change_start,
            player.cost_change_start_fall,
            player.dreamteam_count,
            player.element_type,
            player.ep_next,
            player.ep_this,
            player.event_points,
            player.first_name,
            player.form,
            player.id,
            player.in_dreamteam,
            player.news,
            player.news_added,
            player.now_cost,
            player.photo,
            player.points_per_game,
            player.second_name,
            player.selected_by_percent,
            player.special,
            player.squad_number,
            player.status,
            player.team,
            player.team_code,
            player.total_points,
            player.transfers_in,
            player.transfers_in_event,
            player.transfers_out,
            player.transfers_out_event,
            player.value_form,
            player.value_season,
            player.web_name,
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
            player.bonus,
            player.bps,
            player.influence,
            player.creativity,
            player.threat,
            player.ict_index,
            player.starts,
            player.expected_goals,
            player.expected_assists,
            player.expected_goal_involvements,
            player.expected_goals_conceded,
            player.influence_rank,
            player.influence_rank_type,
            player.creativity_rank,
            player.creativity_rank_type,
            player.threat_rank,
            player.threat_rank_type,
            player.ict_index_rank,
            player.ict_index_rank_type,
            player.corners_and_indirect_freekicks_order,
            player.corners_and_indirect_freekicks_text,
            player.direct_freekicks_order,
            player.direct_freekicks_text,
            player.penalties_order,
            player.penalties_text,
            player.expected_goals_per_90,
            player.saves_per_90,
            player.expected_assists_per_90,
            player.expected_goal_involvements_per_90,
            player.expected_goals_conceded_per_90,
            player.goals_conceded_per_90,
            player.now_cost_rank,
            player.now_cost_rank_type,
            player.form_rank,
            player.form_rank_type,
            player.points_per_game_rank,
            player.points_per_game_rank_type,
            player.selected_rank,
            player.selected_rank_type,
            player.starts_per_90,
            player.clean_sheets_per_90,
          ];

          await pool.query(query, values);
        } catch (error: any) {
          console.error("Error inserting data:", error);
          res
            .status(500)
            .json({ error: "Error inserting data", detail: error.message });
        }
      })
    );
    res.status(200).json({ message: "Data inserted successfully." });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
