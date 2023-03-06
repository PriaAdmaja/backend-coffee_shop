const db = require('../configs/db');

const getUsers = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from users order by `;
        let orderValue = `id asc `;
        if (data.sortBy === 'idDesc') {
            orderValue = `id desc `;
        }
        
        if(data.limit === undefined) {
            sql += orderValue;
        } else {
            sql = sql + orderValue + `limit ${data.limit}`;
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

const findUsers = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from users where id=$1`;
        const values = [data.id];
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

const createUsers = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users ("email", "password", phone_number) values ($1, $2, $3) RETURNING *`;
        const values = [data.email, data.password, data.phoneNumber];
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
        const sql = `update users set display_name=$1, 
                        first_name=$2, 
                        last_name=$3, 
                        birth_date=$4, 
                        gender=$5, 
                        address=$6 
                        where id=$7 RETURNING *`;
        const values = [data.displayName, data.firstName, data.lastName, data.birthDate, data.gender, data.address, data.id];
        db.query(sql, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};

const deleteUsers = (data) => {
    return new Promise((resolve, reject) => {
        const sql =`delete from users where id=$1`;
        const values = [data.id];
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

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    findUsers
};