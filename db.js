import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: ${{secrets.DB_USER}},
    host: ${{secrets.DB_HOST}},
    database: ${{secrets.DB_DATABASE}},
    password: ${{secrets.DB_PASSWORD}},
    port: ${{secrets.DB_PORT}},
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
