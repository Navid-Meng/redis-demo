import { createClient } from "redis"
import dotenv from "dotenv"

dotenv.config()

const client = createClient({
    // password: process.env.REDIS_PASSWORD,
    // socket: {
    //     host: process.env.REDIS_HOST,
    //     port: Number(process.env.REDIS_PORT)
    // }
    url: process.env.REDIS_URL
})

client.on('error', (err) => {
    console.error('Redis Client Error', err)
})

await client.connect()

console.log('Connected to Redis Cloud')

export default client