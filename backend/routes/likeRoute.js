import express from 'express'
const router = express.Router()
import like from '../controllers/like.js'

router.put('/', like.handleLikeUnlike)

export default router