const db = require('../configs/db');

const getHistory = (params, query) => {
    return new Promise((resolve, reject) => {
        let sql = `select distinct on (c.transaction_id) t.id, t.promos_id, p2."method" as "payment", p."name", p.pict_url s2.status , t.created_at, t.notes, d."method", t.grand_total, s."size", c.quantity  from "transaction" t 
        join cart c on t.id = c.transaction_id 
        join products p on p.id = c.product_id 
        join deliveries d on d.id = t.deliveries_id 
        join payment p2 on p2.id = t.payment_id 
        join sizes s on s.id = c.size_id 
        join status s2 on s2.id = t.status_id  where t.users_id = $1;` ;
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
        const sql = `insert into history (user_id, product_id, size, delivery_method, total, set_time) 
                    values ($1, $2, $3, $4, $5, $6) returning *`;
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