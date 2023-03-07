const db = require('../configs/db');

const getProduct = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `select p.id, 
                    p.product_name, 
                    p.description, 
                    p.price, 
                    pc.category 
                    from products p join product_category pc on p.category_id = pc.id `;

        if (data.category !== undefined) {
            sql += `where lower(category) like lower('%${data.category}%') `;
        }
        if (data.name !== undefined) {
            sql += `where lower(product_name) like lower('%${data.name}%') `;
        }

        switch (data.sortBy) {
            case "nameDesc":
                sql += `order by product_name desc `;
                break;
            case "cheapest":
                sql += `order by price asc `;
                break;
            case "priciest":
                sql += `order by price desc `;
                break;
            case "idAsc":
                sql += `order by p.id asc `;
                break;
            case "idDesc":
                sql += `order by p.id dasc `;
                break;
            default: sql += `order by p.product_name asc `;
        }

        if (data.limit !== undefined) {
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
};