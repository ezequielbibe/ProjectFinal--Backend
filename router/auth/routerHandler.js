import { logger } from '../../logs/winston.js'
import { createUser } from '../../controllers/auth/daoControllers.js'
import { generateToken } from '../../controllers/index.js'
import { phoneValidate } from '../../helpers/validations.js'

export const loginController = async (req, res)=> {
     try{
        const { name, email, admin } = req.user
        const token = generateToken({ name, email, admin })
        res.json({ token })
    }catch(error){
        logger.error(`We has problems: ${error.message}`)
    }
}

export const registerController = async (req, res) => {
    try{
        const { name, age, address, phone, avatar } = req.body
        const { email, password } = req.session.passport.user    

        if(!phoneValidate(phone)) {
            res.status(403)
            res.json({ errorMessage: 'Phone number is invalid.'})
            return
        }

        const data = createUser({ email, password, name, age, address, phone, avatar, admin: false })
        res.json({ message: 'User added successfully', data})
    }catch(error){
        logger.error(`error: ${error.message}`)
    }
}

export const errorController = (req, res) => {
    const errorMessage = req.session.messages[0]
    req.session.destroy()
    res.status(403)
    res.json({ errorMessage })
}