const db = require('../configs/db');

const getHistory = (params, query) => {
    return new Promise((resolve, reject) => {
        let sql = `select distinct on (c.transaction_id) t.id, t.promos_id, p2."method" as "payment", p."name", p.pict_url, s2.status , t.created_at, t.notes, d."method", t.grand_total, s."size", c.quantity  from "transaction" t 
        join cart c on t.id = c.transaction_id 
        join products p on p.id = c.product_id 
        join deliveries d on d.id = t.deliveries_id 
        join payment p2 on p2.id = t.payment_id 
        join sizes s on s.id = c.size_id 
        join status s2 on s2.id = t.status_id where t.users_id = $1 ` ;
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

const deleteCart = ({transactionId}) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from cart where transaction_id = $1`;
        const values = [transactionId];
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

const deleteTransaction = ({transactionId}) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from "transaction" where id = $1`;
        const values = [transactionId];
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
    deleteCart,
    deleteTransaction
};