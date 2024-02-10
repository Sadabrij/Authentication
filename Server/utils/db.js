const mongoose = require("mongoose")


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.URI)

    } catch (error) {
        
        console.log("dbConnect | ", error.message)

    }
   

}

module.exports = {dbConnection}
