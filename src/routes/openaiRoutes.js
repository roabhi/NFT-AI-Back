const express = require('express')
const router = express.Router()
const {generateImage, generateVariation} = require('../controllers/openaiController')

router.post('/generateimage', generateImage)
router.post('/generatevariation', generateVariation)

module.exports = router
