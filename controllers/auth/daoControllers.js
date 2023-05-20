import { daoUsers } from "../../dao/index.js"
import { logger } from "../../logs/winston.js"

export const createUser = async (data) => {
    try{
        const newData = {...data, admin: false}
        const req = daoUsers.createData(newData)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getAllUsers = async () => {
    try{
        const req = await daoUsers.readAllData()
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const getUserByEmail = async (email) => {
    try{
        const req = await daoUsers.readOneData('email', email)
        return req
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const clearUsers = async () => {
    await daoUsers.clearData()
}