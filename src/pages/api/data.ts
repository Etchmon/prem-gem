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

    // Pull Player data out from json
    // Use players name to scrape transfermarkt data
    // Create new model for Player Schema
    // Add data from API and transfermarkt to new player model
    // Insert player into database


    res.status(200).json(playerList);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


