import express from 'express'
const router = express.Router()
import refreshToken from '../controllers/refreshToken.js'

router.get('/', refreshToken.handleRefreshToken)

export default router