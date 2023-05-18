const db = require('../configs/db')

const getCartData = (transactionId) => {
    return new Promise((resolve, reject) => {
        const sql = `select p."name" , p.pict_url , c.quantity , c.price from cart c 
        left join products p on c.product_id = p.id 
        where transaction_id = $1;`
        db.query(sql, [transactionId], (err, result) => {
            if(err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    getCartData
}