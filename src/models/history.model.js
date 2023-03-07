const db = require('../configs/db');

const getHistory = (params, query) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from history where user_id=$1 ` ;
        const values = [params.userId];
        if(query.limit !== undefined) {
            sql += `limit ${query.limit}`;
        }
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const getAllHistory = ( query) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from history `;
        if(query.limit !== undefined) {
            sql += `limit ${query.limit}`;
        }
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const addHistory = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into history (user_id, product_id, size, delivery_method, total, set_time, created_at) 
                    values ($1, $2, $3, $4, $5, $6, now()) returning *`;
        const values = [data.userId, data.productId, data.size, data.deliveryMethod, data.total, data.setTime];
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const editHistory = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `update history set 
        user_id=$1, 
        product_id=$2, 
        size=$3,
        delivery_method=$4,
        total=$5,
        set_time=$6  
        where id=$7 RETURNING *`;
        const values = [data.userId, data.productId, data.size, data.deliveryMethod, data.total, data.setTime, data.id];
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteHistory = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from history where id=$1`;
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
    getHistory,
    addHistory,
    editHistory,
    deleteHistory,
    getAllHistory
};