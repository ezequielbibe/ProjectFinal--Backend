import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const PERSISTENCE = process.env.PERSISTENCE
export const MONGO_ATLAS = process.env.MONGO_ATLAS
export const MONGO_LOCAL = process.env.MONGO_LOCAL
export const PRIVATE_KEY = process.env.PRIVATE_KEY