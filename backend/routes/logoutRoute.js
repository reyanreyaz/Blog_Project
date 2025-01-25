import express from 'express'
const router = express.Router()
import logout from '../controllers/logout.js'

router.get('/', logout.handleLogout)

export default router