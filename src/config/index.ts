import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
  },
}
