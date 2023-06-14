const db = require('../configs/db');

const transactionModel = require('../models/transaction.model');
const usersModel = require('../models/users.model')
const { send } = require('../utils/notification')

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
        
        const data = {
            id : result.rows[0].users_id
        }
        const userData = await usersModel.findUsers(data)
        if(userData.rows[0].fcm_token) {
            const notification = {
                title: 'Order',
                body: 'Your order has been processed by admin.'
            }
            await send(userData.rows[0].fcm_token, notification)
        }
        
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

const getAllTransactions = async (req, res) => {
    try {
        const { query } = req;
        const result = await transactionModel.getAllTransactions(query.statusId);
        res.status(201).json({
            data: result.rows,
            msg: "Get transaction data"
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
    editTransactionStatus,
    getAllTransactions
}