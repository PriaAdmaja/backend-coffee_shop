const welcomePage = (req, res) => {
    res.json({
        msg: "Welcome to Coffee Shop server"
    })
}

module.exports = welcomePage