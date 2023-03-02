const db = require('../configs/db');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.query(
            "select id, email, phone_number from users",
            (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            }
        )
    })
}

module.exports = {
    getUsers,
}