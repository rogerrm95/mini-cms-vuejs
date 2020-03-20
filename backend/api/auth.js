const jwt = require('jwt-simple') // (JSON Web Token)
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const transport = require('../modules/mailer')
const { authSecret } = require('../.env')

module.exports = app => {
    const { existsOrError, equalsOrError, testPassword} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha !')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send("Usuário não encontrado...")

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send("Senha Inválida...")

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24) // 1 DIA
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            res.send(e)
        }
        res.send(false)
    }

    const forgotPassword = async (req, res) => {
        const emailUser = req.body.email
        console.log(emailUser)

        try {
            const emailUserById = await app.db('users')
                .select('id','name')
                .where({ email: emailUser })
                .whereNull('deletedAt')
                .first()

            if (!emailUserById) {
                return res.status(404).send('Usuário não encontrado')
            }

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date()
            now.setDate(now.getDate() + 1)

            await app.db('users')
                .update({passResetToken: token, tokenExpires: now })
                .where({id: emailUserById.id})
                .whereNull('deletedAt')

            const name = emailUserById.name

            transport.sendMail({
                to: emailUser,
                from: 'rogerrm2014@gmail.com',
                template: '/auth/forgotPassword',
                context: { token, emailUser, name},
            }, (err) => {
                if(err) {
                    console.log(err)
                    return res.status(400).send('Erro. Não pode enviar o email !')
                }
                return res.send()
            })

        }
        catch (err) {
            console.log(err)
            res.status(400).send('Erro em Esqueci minha Senha ! Tenta novamente...')
        }
    }

    const resetPassword = async (req, res) => {
        const {password, confirmPassword, token, email} = req.body;


        try{
            const user = await app.db('users')
                .select('passResetToken','tokenExpires','password')
                .where({email: email})
                .first()
            
            if(!user){
                return res.status(400).send('Erro -> Usuário não foi encontrado!!')
            }
            if(token !== user.passResetToken)
                return res.status(400).send('Erro -> Token Inválido')
            
            const now = new Date();

            if(now > user.tokenExpires){
                return res.status(400).send('Erro -> Token Expirado')
            }

            equalsOrError(password, confirmPassword,'Senhas não conferem')
            existsOrError(password, 'Senha não informada')
            existsOrError(confirmPassword, 'Confirmação de Senha inválida')
            testPassword(password, "Senha Fraca - Utilize Letras maiusculas e minúsculas")

            user.password = password
            user.password = encryptPassword(user.password)
            delete confirmPassword

            await app.db('users')
                .update({password: user.password})
                .where({email: email})
                        
            res.send('Senha Alterada')
        }
        catch(err){
            res.status(400).send('Erro: não foi possível resetar a senha, tente novamente')
            console.log(err)
        }
    }
    return { signin, validateToken, forgotPassword, resetPassword}
}