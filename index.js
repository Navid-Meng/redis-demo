import client from "./lib/redisClient.js"
import { v4 as uuidv4 } from "uuid"

const item = {
    id: uuidv4(),
    name: "Me before you"
}

await client.rPush('books', JSON.stringify(item))

console.log('Items added to Redis list')

async function readAll() {
    const items = await client.lRange('books', 0, -1)
    const parsedItems = items.map(item => JSON.parse(item))
    console.log('All items: ', parsedItems)
    return parsedItems
}

async function removeItemById(id, items) {
    const item = items.find(item => item.id === id)
    console.log('Item to remove: ', item)
    if (item) {
        await client.lRem('books', 1, JSON.stringify(item))
        console.log('Removed item with ID: ', item.id)
    }
}

const allItems = await readAll()
removeItemById('1f37415c-53b5-4613-8419-bc7da5f2371f', allItems)

await client.quit()