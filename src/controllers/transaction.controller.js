const db = require('../configs/db');

const transactionModel = require('../models/transaction.model');

const createTransaction = async (req, res) => {
    const { authInfo, body} = req;
    const client = await db.connect()
    try {
        (await client).query("BEGIN");
        const result = await transactionModel.createTransaction(client, body, authInfo.id);
        const transactionId = result.rows[0].id;
        await transactionModel.createCart(client, body, transactionId);
        (await client).query("COMMIT");
        const transactionDetail = await transactionModel.getTransactionDetail(client, transactionId);
        res.status(200).json({
            data: transactionDetail.rows,
            msg: "OK"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    } finally {
        (await client).release();
    }
};

module.exports = {
    createTransaction
}