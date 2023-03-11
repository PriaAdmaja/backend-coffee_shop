const db = require('../configs/db');
const bcrypt = require('bcrypt')

const getUsers = (query) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from users order by `;
        let orderValue = `id asc `;
        if (query.sortBy === 'idDesc') {
            orderValue = `id desc `;
        }

        sql += orderValue;

        if (query.limit !== undefined) {
            sql += `limit ${query.limit}`;
        }

        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }
        );
    });
};

const findUsers = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from users where id=$1`;
        const values = [params.id];
        console.log(params.id);
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }
        );
    });
};

const createUsers = (email, password, phoneNumber) => {
    return new Promise((resolve, reject) => {
        const char = `qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0987654321`
        let otp = ``
        for(let i = 0; i < 10; i++ ) {
            otp += char[Math.floor(Math.random() * char.length)]
        }

        const sql = `INSERT INTO users ("email", "password", phone_number, otp, created_at) values ($1, $2, $3, $4, now()) RETURNING *`;
        const values = [email, password, phoneNumber, otp];
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        }
        );
    });
};

const updateUsers = (data) => {
    return new Promise((resolve, reject) => {
        const dataAvail = []
        if (data.displayName != null) {
            dataAvail.push('display_name=')
        }
        if (data.firstName != null) {
            dataAvail.push('first_name=')
        }
        if (data.lastName != null) {
            dataAvail.push('last_name=')
        }
        if (data.birthDate != null) {
            dataAvail.push('birth_date=')
        }
        if (data.gender != null) {
            dataAvail.push('gender=')
        }
        if (data.address != null) {
            dataAvail.push('address=')
        }
        const dataQuery = dataAvail.map((data, i) => (`${data}$${i + 1}`)).join(`, `)
        const rawValues = [data.displayName, data.firstName, data.lastName, data.birthDate, data.gender, data.address, data.userId];
        const values = rawValues.filter(d => d);
        let sql = `update biodata set ${dataQuery} where users_id=$${values.length} RETURNING *`;
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        }
        );
    });
};

const deleteUsers = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from users where id=$1`;
        db.query(sql, [params.id], (err, result) => {
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
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    findUsers
};