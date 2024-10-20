const { Router } = require('express');
const { create } = require('../controllers/comment.controller');
const router = Router();

// /api/comment
router.post('/', create); // Создание комментария

module.exports = router;






/* const {Router} = require('express')
const {create} = require('../controllers/comment.controller')
const router = Router()

// /api/comment
router.post('/', create)

module.exports = router */
