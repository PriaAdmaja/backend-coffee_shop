const db = require('../configs/db');

const getProduct = () => {
    return new Promise((resolve, reject) => {
        const sqlCode = "select * from products order by id asc"
        db.query(sqlCode, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result);
        }
        )
    })
}

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (product_name, price, description, category_id) values ($1, $2, $3, $4) RETURNING *"
        const values = [data.productName, data.price, data.description, data.categoryId]
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);

            }
            resolve(result);
        }
        );
    });
}

const editProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sqlCode = `update products set 
        product_name=$1, 
        price=$2, 
        description=$3, 
        category_id=$4 
        where id=$5 RETURNING *`
        const values = [data.productName, data.price, data.description, data.categoryId, data.id]
        db.query(sqlCode, values, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const deleteProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sqlCode =`delete from products where id=$1`
        const values = [data.id]
        db.query(sqlCode, values, (err, result) => {
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
    getProduct,
    addProduct,
    editProduct,
    deleteProduct

}