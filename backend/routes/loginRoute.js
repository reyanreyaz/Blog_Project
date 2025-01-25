import express from 'express'
const router = express.Router()
import login from '../controllers/login.js'

router.post('/', login.handleLogin)

export default router