import cors from 'cors'
import express, {
  type Express,
  type RequestHandler,
  type Router,
  type RouterOptions
} from 'express'
import helmet from 'helmet'
import { __IS_PROD__ } from './config'
import {
  errorHandler,
  // globalMinuteRateLimiter,
  // globalSecondRateLimiter,
  // globalSpeedLimiter,
  parseQueryParams
} from './middlewares'

export const _app = express()
const createRouter: (options?: RouterOptions) => Router = express.Router
export const router = createRouter()

// Express definitions
_app.set('trust proxy', 1) // Trust Vercel

// Global middlewares
// if (__IS_PROD__) {
//   _app.use(globalMinuteRateLimiter)
//   _app.use(globalSecondRateLimiter)
//   _app.use(globalSpeedLimiter)
// }

_app.use(express.json({ limit: '5mb' }) as RequestHandler)
_app.use(express.urlencoded({ extended: true }) as RequestHandler)
_app.use(express.static('public') as RequestHandler)

// Security middlewares
_app.use(cors())
_app.use(
  helmet({
    dnsPrefetchControl: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: true,
    xssFilter: true
  }) as RequestHandler
)

// Custom middlewares
_app.use(parseQueryParams)

if (__IS_PROD__) {
  _app.use(errorHandler)
}

export default __IS_PROD__ ? _app : (router as Express)
