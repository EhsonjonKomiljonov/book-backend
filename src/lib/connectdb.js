const { Pool } = require('pg');
const { pgConfig } = require('../config.js');
const pool = new Pool({
  connectionString:
    'postgres://isqjgkvh:NoeK5C1ZEIJtxfnMW2zcNGfqkC5thPib@trumpet.db.elephantsql.com/isqjgkvh',
});

const fetch = async (sqlQuery, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(sqlQuery, params.length ? params : null);
    return row;
  } catch (error) {
    throw new Error(error);
  } finally {
    await client.release();
  }
};

const fetchAll = async (sqlQuery, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      sqlQuery,
      params.length ? params : null
    );
    return rows;
  } catch (error) {
    throw new Error(error);
  } finally {
    await client.release();
  }
};

module.exports = { fetch, fetchAll };
