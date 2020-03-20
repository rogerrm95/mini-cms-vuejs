const mongoose = require('mongoose')
const { mongoDB } = require('../.env')

const { MONGO_DB, MONGO_HOSTNAME, MONGO_PORT} = mongoDB

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

// Conexão com o MongoDB
mongoose.connect(url, { useNewUrlParser: true })
    .then(_ => console.log("CONECTADO AO MONGO"))
    .catch(e => {
        const msg = "Erro, não foi posível conectar-se ao mongoBD"
        console.log("\x1b[45m" + msg + "\x1b[0m" + e)
    })