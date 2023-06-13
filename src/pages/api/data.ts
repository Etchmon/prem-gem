import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */

export default async function fantasyData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


