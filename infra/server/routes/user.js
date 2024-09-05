const router = require("express").Router();

router.get('/hello', async (req, res) => {
    return("Hello boy!")
});

module.exports = router;