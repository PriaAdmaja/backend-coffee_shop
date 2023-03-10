const db = require('../configs/db')

const userVerification = (data) => {
    return new Promise((resolve, reject) => {
        const sql= `select id, created_at, password from users where email=$1`;
        db.query(sql, [data.email], (err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    userVerification
}