const express = require('express');
const { LoginUser, InsertDnd, InsertNumber } = require('./user.controller');
const uploadFile = require('../../MiddleWares/uploadFile');
const router = express.Router();

router.post('/login',LoginUser);
router.post('/dnd_file',uploadFile.single('file'),InsertDnd);
router.post('/number',InsertNumber)



module.exports = router
