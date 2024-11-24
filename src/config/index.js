const { connect } = require("mongoose");

const uri = 'mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/primerPreEntrega'

const connectDb = async () => {
    console.log('base de datos conectada')
    await connect(uri)
}

module.exports = {
    connectDb
}