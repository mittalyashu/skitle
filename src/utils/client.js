const {Pool} = require('pg')

class Client {
  constructor(url) {
    this.url = url
  }

  connect() {
    const pool = new Pool({
      connectionString: this.url,
      max: 4,
      min: 1,
      ssl: {
        rejectUnauthorized: false,
      },
    })

    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) return reject(err)

        this.client = client
        this.done = done
        resolve()
      })
    })
  }

  query(sql, params = []) {
    return this.connect()
    .then(() => {
      return new Promise((resolve, reject) => {
        this.client.query(sql, params, (err, result) => {
          if (err) reject(err)
          resolve(result)
          // todo: unable to release connection after each query
          // this.done()
        })
      })
    })
  }

  find(sql, params = []) {
    return this.query(sql, params).then(result => result.rows)
  }

  findOne(sql, params = []) {
    return this.query(sql, params).then(result => result.rows[0])
  }
}

module.exports = Client
