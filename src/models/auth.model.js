const db = require('../configs/db')

const userVerification = (data) => {
    return new Promise((resolve, reject) => {
        const sql= `select id, created_at, roles_id, password from users where email=$1`;
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

const createOtp = (email, otp) => {
    return new Promise((resolve, reject) => {
        const sql = `update users set otp=$1 where email=$2 returning otp`;
        db.query(sql, [otp, email], (err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const checkOtp = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `select otp from users where email=$1`;
        db.query(sql, [email], (err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const setNewPassword = (newPassword, email) => {
    return new Promise((resolve, reject) => {
        const sql = `update users set otp=$1, password=$2 where email=$3`;
        db.query(sql, [null, newPassword, email], (err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const checkUsers = (body) => {
    return new Promise((resolve, reject) => {
        const sql = `select email from users where email=$1`;
        db.query(sql, [body.email], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }
        );
    });
};

module.exports = {
    userVerification,
    getPassword,
    editPassword,
    createOtp,
    checkOtp,
    setNewPassword,
    checkUsers
}