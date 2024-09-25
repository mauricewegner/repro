import { RedisStore } from 'rate-limit-redis'
import { redisClient } from '../../services'

export const globalMinuteLimiterStore = new RedisStore({
  prefix: 'rl:global:min:',
  // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
  sendCommand: (...args: string[]) => redisClient.call(...args)
})

export const globalSecondLimiterStore = new RedisStore({
  prefix: 'rl:global:sec:',
  // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
  sendCommand: (...args: string[]) => redisClient.call(...args)
})

export const organizationAppLimiterStore = new RedisStore({
  prefix: 'rl:org:app:',
  // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
  sendCommand: (...args: string[]) => redisClient.call(...args)
})

export const globalSpeedLimiterStore = new RedisStore({
  prefix: 'sl:global:',
  // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
  sendCommand: (...args: string[]) => redisClient.call(...args)
})
