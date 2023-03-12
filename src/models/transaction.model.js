
const createTransaction = (client, body, userId) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into "transaction" (users_id, promos_id, payment_id, deliveries_id, notes, created_at)
        values ($1, $2, $3, $4, $5, now()) returning id`;
        const values = [userId, body.promoId, body.paymentId, body.deliveryId, body.notes]
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
        let sql = `insert into cart (transaction_id, product_id, size_id, quantity, subtotal) values `;
        let values = [];
        products.forEach((product, i) => {
            const { productId, sizeId, quantity, subtotal } = product;
            if (values.length) sql += ", ";
            sql += `($${1 + 5 * i}, $${2 + 5 * i}, $${3 + 5 * i}, $${4 + 5 * i}, $${5 + 5 * i})`;
            values.push(transactionId, productId, sizeId, quantity, subtotal);
        });
       
        client.query(sql, values, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const getTransactionDetail = (client, transactionId) => {
    return new Promise((resolve, reject) => {
        const sql = `select u.email, b.address, p3."name" as "product", s2."size", p2."method" as "payment", c.quantity, p.coupon_code as "promo", c.subtotal from cart c 
        join "transaction" t on t.id = c.transaction_id
        join users u on u.id = t.users_id 
        join promos p on p.id  = t.promos_id 
        join payment p2 on p2.id = t.payment_id 
        join deliveries d on d.id = t.deliveries_id 
        join status s on s.id = t.status_id 
        join products p3 on p3.id = c.product_id 
        join sizes s2 on s2.id = c.size_id  
        join biodata b on b.users_id = u.id where t.id = $1`;
        client.query(sql, [transactionId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    createTransaction,
    createCart,
    getTransactionDetail
}