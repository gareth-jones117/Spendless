const config = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'spendless_user', 
      password: 'Fallout101',
      database: 'spendless_dev',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
}

module.exports = config
