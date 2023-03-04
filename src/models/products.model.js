const db = require('../configs/db');

const getProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `select p.id, 
                    p.product_name, 
                    p.description, 
                    p.price, 
                    pc.category 
                    from products p join product_category pc on p.category_id = pc.id order by`;
        let orderValue = "p.product_name asc";
        if(data.sortBy === "nameDesc") {
            orderValue = `product_name desc`
        }
        if(data.sortBy === "cheapest") {
            orderValue = `price asc`
        }
        if(data.sortBy === "pricey") {
            orderValue = `price desc`
        }
        if(data.sortBy === "idAsc") {
            orderValue = `p.id asc`
        }
        if(data.sortBy === "idDesc") {
            orderValue = `p.id desc`
        }

        let sqlFinal = `${sql} ${orderValue}`

        db.query(sqlFinal, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        }
        )
    })
}

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sqlCode = "INSERT INTO products (product_name, price, description, category_id) values ($1, $2, $3, $4) RETURNING *"
        const values = [data.productName, data.price, data.description, data.categoryId]
        db.query(sqlCode, values, (err, result) => {
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