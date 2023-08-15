const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const schedule = require('node-schedule');


const app = express()

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const port = 3000



const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "futureemailee@gmail.com",
        pass: "wrchaqpuvziauczj"
    }
}

const send = (data) => {
    const transporter = nodemailer.createTransport(config)
    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            return info.response
        }
    })
}



const job = schedule.scheduleJob('0 1 * * * *', async () => {
    const connection =  mongoose.model("Person", newSchema, "Person")
    const current_date = new Date().toLocaleDateString("en-GB")
    const query = await connection.find({})
    

    for (let index = 0; index < query.length; index++) {

        if (query[index].date === current_date) {

            const email = query[index].email
            const data = {
                    "from": "jerrellabrahams50@gmail.com",
                    "to": email,
                    "subject": "Your Email from the past has arrived",
                    "text": query[index].emailContent
                }
                send(data)

                await connection.collection.deleteOne( {date: current_date})
            
        }
        
    }
})


const ConnectDb = async () => {
    const uri = "mongodb+srv://jerrellabrahams50:jerrellabrahams50@cluster0.ooiycdu.mongodb.net/?retryWrites=true&w=majority";
    const options = {
        dbName: "future-email"
    }
    try {
        await mongoose.connect(uri, options, {useUnifiedTopology: true, useNewUrlParser: true})
    } catch (err) {
        console.error(err)
    }
}

const newSchema = new Schema({
    emailContent: String,
    email: String,
    privacy: String,
    date: String
})


ConnectDb()


app.get("/", async function (req, res) {
    const connection = mongoose.model("Person", newSchema, "Person")
    const allEmails = await connection.find({privacy: "public"})
    res.render("index", {data: allEmails})
})


app.post("/", async function (req, res) {
    const connection =  mongoose.model("Person", newSchema, "Person")
    const letterContent = req.body.letterContent
    const email = req.body.email
    const years = req.body.number_of_years
    var privacy_status = req.body.privacy_toggle


    if (privacy_status != "private") {
        privacy_status = "public"
    }


    if (years.length <= 2) {
        const currentDate = new Date()
        var newDate = new Date(currentDate.setMonth(currentDate.getMonth() + parseInt(years)))
    } else {
        var newDate = new Date(years)
    }


    if (letterContent === "" || email === "" || years === "") {
        console.log("Please enter all required fields")
    } else {
        console.log("All requirements met, pushing to database...")
        await connection.collection.insertOne( {
            emailContent: letterContent,
            email: email,
            privacy: privacy_status,
            date: newDate.toLocaleDateString("en-GB")
    })
    }

    res.render("sent_page", {date: newDate.toDateString()})
})


app.get("/about_project", (req, res) => {
    
    res.render("about_project_page")
})

app.listen(3000, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("listening on port " + port)
    }
})


