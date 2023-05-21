const db = require('../configs/db');

const transactionModel = require('../models/transaction.model');

const createTransaction = async (req, res) => {
    const { authInfo, body } = req;
    const client = await db.connect()
    try {
        await client.query("BEGIN");
        const result = await transactionModel.createTransaction(client, body, authInfo.id);
        const transactionId = result.rows[0].id;
        await transactionModel.createCart(client, body, transactionId);
        await client.query("COMMIT");
        const transactionDetail = await transactionModel.getTransactionDetail(client, transactionId);
        res.status(200).json({
            data: transactionDetail.rows,
            msg: "Success create new order"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    } finally {
        client.release();
    }
};

const editTransactionStatus = async (req, res) => {
    try {
        const { body, params } = req;
        const result = await transactionModel.editTransactionStatus(body.statusId, params.transactionId);
        res.status(201).json({
            data: result.rows,
            msg: "Success update transaction"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = {
    createTransaction,
    editTransactionStatus
}