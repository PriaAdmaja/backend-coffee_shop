const db = require('../configs/db');

const createTransaction = (client, body, userId) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into "transaction" (users_id, promos_id, payment_id, deliveries_id,  notes, grand_total, created_at)
        values ($1, $2, $3, $4, $5, $6, now()) returning id`;
        const values = [userId, body.promoId, body.paymentId, body.deliveryId, body.notes, body.grandTotal]
        client.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const createCart = (client, body, transactionId) => {
    return new Promise((resolve, reject) => {
        const { products } = body
        let sql = `insert into cart (transaction_id, product_id, size_id, quantity, price) values `;
        let values = [];
        products.forEach((product, i) => {
            const { productId, sizeId, quantity, price } = product;
            if (values.length) sql += ", ";
            sql += `($${1 + 5 * i}, $${2 + 5 * i}, $${3 + 5 * i}, $${4 + 5 * i}, $${5 + 5 * i})`;
            values.push(transactionId, productId, sizeId, quantity, price);
        });
       
        client.query(sql, values, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const editTransactionStatus = (statusId, transactionId) => {
    return new Promise((resolve, reject) => {
        const sql = `update "transaction" set status_id = $1 where id=$2 returning *`
        db.query(sql, [statusId, transactionId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

const getTransactionDetail = (client, transactionId) => {
    return new Promise((resolve, reject) => {
        const sql = `select u.email, b.address, p3."name" as "product", s2."size", p2."method" as "payment", c.quantity, p.coupon_code as "promo", c.price from cart c 
        left join "transaction" t on t.id = c.transaction_id
        left join users u on u.id = t.users_id 
        left join promos p on p.id  = t.promos_id 
        left join payment p2 on p2.id = t.payment_id 
        left join deliveries d on d.id = t.deliveries_id 
        left join status s on s.id = t.status_id 
        left join products p3 on p3.id = c.product_id 
        left join sizes s2 on s2.id = c.size_id  
        left join biodata b on b.users_id = u.id where t.id = $1`;
        client.query(sql, [transactionId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getAllTransactions = (statusId) => {
    return new Promise ((resolve, reject) => {
        const values = []
        let sql = `select distinct on (c.transaction_id) t.id, t.promos_id, t.updated_at, d."method", t.created_at, p2."method" as "payment", p."name", p.pict_url, s2.status , t.created_at, t.notes, d."method", t.grand_total, s."size", c.quantity  from "transaction" t 
        join cart c on t.id = c.transaction_id 
        join products p on p.id = c.product_id 
        join deliveries d on d.id = t.deliveries_id 
        join payment p2 on p2.id = t.payment_id 
        join sizes s on s.id = c.size_id 
        join status s2 on s2.id = t.status_id `
        if(statusId !== undefined) {
            sql += `where t.status_id = $1 `
            values.push(statusId)
        }
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

module.exports = {
    createTransaction,
    createCart,
    getTransactionDetail,
    editTransactionStatus,
    getAllTransactions
}