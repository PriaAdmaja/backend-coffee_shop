const db = require('../configs/db');

const getProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `select p.id, 
                    p.product_name, 
                    p.description, 
                    p.price, 
                    pc.category 
                    from products p join product_category pc on p.category_id = pc.id order by`;

        let orderValue = '';
        switch (data.sortBy) {
            case "nameDesc":
                orderValue = `product_name desc`;
                break;
            case "cheapest":
                orderValue = `price asc`;
                break;
            case "priciest":
                orderValue = `price desc`;
                break;
            case "idAsc":
                orderValue = `p.id asc`;
                break;
            case "idDesc":
                orderValue = `p.id dasc`;
                break;
            default: orderValue = "p.product_name asc";
        }

        let sqlFinal;

        if (data.limit === undefined) {
            sqlFinal = `${sql} ${orderValue}`;
        } else {
            sqlFinal = `${sql} ${orderValue} limit ${data.limit}`;
        }

        db.query(sqlFinal, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const findProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `select p.id, 
        p.product_name, 
        p.description, 
        p.price, 
        pc.category 
        from products p join product_category pc on p.category_id = pc.id 
        where lower(${data.tableName}) like lower('%${data.word}%')`;

        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (product_name, price, description, category_id) values ($1, $2, $3, $4) RETURNING *";
        const values = [data.productName, data.price, data.description, data.categoryId];
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);

            }
            resolve(result);
        }
        );
    });
};

const editProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `update products set 
        product_name=$1, 
        price=$2, 
        description=$3, 
        category_id=$4 
        where id=$5 RETURNING *`;
        const values = [data.productName, data.price, data.description, data.categoryId, data.id];
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from products where id=$1`;
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
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    findProduct
};