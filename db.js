import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: "vidyarang",
    host: "localhost",
    database: "blog",
    password: "Sai@2005",
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
