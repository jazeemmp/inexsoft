import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectionUrl = process.env.DB_URL as string


const databaseConnection = async (): Promise<void> => {
    try {
        await connect(connectionUrl)
        console.log("Database connected successfully  🚀")

    } catch (error) {
        console.log("Failed to connect database😭", error)
    }
}


export default databaseConnection