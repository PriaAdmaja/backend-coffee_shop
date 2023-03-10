const db = require('../configs/db');

const getProduct = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `select p.id, 
                    p.name, 
                    p.description, 
                    p.price, 
                    c.category 
                    from products p join category c on p.category_id = c.id `;

        if (data.category !== undefined) {
            sql += `where lower(category) like lower('%${data.category}%') `;
        }
        if (data.name !== undefined) {
            sql += `where lower(name) like lower('%${data.name}%') `;
        }

        switch (data.sortBy) {
            case "nameDesc":
                sql += `order by name desc `;
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
                sql += `order by p.id desc `;
                break;
            default: sql += `order by p.name asc `;
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

const getSingleProduct = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select p.name, p.description, p.price, c.category 
        from products p join category c on p.category_id = c.id where p.id=$1`;
        db.query(sql, [params.id], (err, result) => {
            if (err) {
                return reject(err);

            }
            resolve(result);
        }
        );
    });
};

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (name, price, description, category_id) values ($1, $2, $3, $4) RETURNING *";
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
        const dataAvail = []
        if(data.productName != null) {
            dataAvail.push('name=')
        }
        if(data.price != null) {
            dataAvail.push('price=')
        }
        if(data.description != null) {
            dataAvail.push('description=')
        }
        if(data.categoryId != null) {
            dataAvail.push('category_id=')
        }
        const dataQuery = dataAvail.map((data, i) => (`${data}$${i+1}`)).join(`, `)
        const rawValues = [data.productName, data.price, data.description, data.categoryId, data.id];
        const values = rawValues.filter(d => d);
        let sql = `update products set ${dataQuery} where id=$${values.length} RETURNING *`;
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteProduct = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from products where id=$1`;
        db.query(sql, [params.id], (err, result) => {
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
    getSingleProduct
};