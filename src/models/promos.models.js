const db = require('../configs/db')

const getPromos = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from promo `
        if(data.limit !== undefined) {
            sql += `limit ${data.limit}`
        }
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        })
    })
}

const addPromos = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into promo (coupon_code, discount, description) values ($1, $2, $3) returning *`
        const values = [data.couponCode, data.discount, data.description]
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        })
    })
}

const editPromos = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `update promo set 
        coupon_code=$1, 
        discount=$2, 
        description=$3  
        where id=$4 RETURNING *`
        const values = [data.couponCode, data.discount, data.description, data.id]
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const deletePromos = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from promo where id=$1`
        const values = [data.id]
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result);
        }
        )
    })
}

module.exports = {
    getPromos,
    addPromos,
    editPromos,
    deletePromos
}