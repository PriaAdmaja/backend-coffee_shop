const db = require('../configs/db');

const getPromos = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `select pr.id, pr.coupon_code, pr.discount, pr.description, p.name, p.pict_url from promos pr left join products p on p.id = pr.products_id`;
        if(data.limit !== undefined) {
            sql += `limit ${data.limit}`;
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

const getSinglePromo = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from promos where id=$1`;
        db.query(sql, [params.id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        }
        );
    });
};

const addPromos = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO promos (coupon_code, discount, description, products_id) values ($1, $2, $3, $4) RETURNING *`;
        const values = [data.couponCode, data.discount, data.description, data.productsId];
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const editPromos = (data) => {
    return new Promise((resolve, reject) => {
        const dataAvail = []
        if(data.couponCode != null) {
            dataAvail.push('coupon_code=')
        }
        if(data.discount != null) {
            dataAvail.push('discount=')
        }
        if(data.description != null) {
            dataAvail.push('description=')
        }
        const dataQuery = dataAvail.map((data, i) => (`${data}$${i+1}`)).join(`, `)
        const rawValues = [data.couponCode, data.discount, data.description, data.id];
        const values = rawValues.filter(d => d);
        const sql = `update promos set ${dataQuery} where id=$${values.length} RETURNING *`;
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deletePromos = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from promos where id=$1`;
        const values = [params.id];
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
    getPromos,
    addPromos,
    editPromos,
    deletePromos,
    getSinglePromo
};