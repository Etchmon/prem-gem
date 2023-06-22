import  pool  from '../../../graphql/db'

async function getAllPlayers() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELET * FROM prem_player.player')
        console.log(result.rows);
        return result.rows;
    } finally {
        client.release();
    }
}

export { getAllPlayers };