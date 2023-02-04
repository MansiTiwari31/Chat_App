var express = require('express');
var router = express.Router();
var socket = require('socket.io');

router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;