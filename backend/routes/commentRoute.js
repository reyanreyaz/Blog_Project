import express from 'express'
const router = express.Router()
import comment from '../controllers/comment.js'

router.put('/:postId', comment.handleNewComment)

export default router