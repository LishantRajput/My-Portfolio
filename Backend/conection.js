const { default: mongoose, model } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const dbconnection = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}`)

        console.log("Connected")

    } catch (error) {
        console.log("Conection error")
        console.log(error)


    }
}
module.exports = dbconnection