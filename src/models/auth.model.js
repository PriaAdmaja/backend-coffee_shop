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

const getPassword = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `select password from users where id=$1`;
        db.query(sql, [id], (err, result) => {
            if(err) {
                return reject(err);
            };
            resolve(result);
        } );
    });
};

const editPassword = (password, id) => {
    return new Promise((resolve, reject) => {
        const sql = `update users set password=$1 where id=$2`;
        db.query(sql, [password, id], (err, result) => {
            if(err) {
                return reject(err);
            };
            resolve(result)
        });
    });
};

const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `select otp from users where email=$1`;
        db.query(sql, [email], )
    })
}

module.exports = {
    userVerification,
    getPassword,
    editPassword

}