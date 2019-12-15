var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '六角學院留言板'
    });
});
/* GET home page. */
module.exports = router;