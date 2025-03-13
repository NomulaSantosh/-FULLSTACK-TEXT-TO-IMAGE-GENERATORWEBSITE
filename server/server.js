// we will install some packages=> "npm i express cors dotenv nodemon form-data jsonwebtoken mongoose axios bcrypt razorpay"

// cors: will allow us to connect the backend server with our front end 
// dotenv: using this we can create .env file and use it in the backend server
// nodemon:  using this package we can restart the backend server whenever we will make any changes in code file
// jsonwebtoken: using that we will add the authentication in our project
// mongoose: using this pkg we will connect our backend server with mongoDB database
// axios: It will help us to make the API calls
// bcrypt: Using this we can encrypt the password
// razorpay: Using this razorpay we will add the online payment gateway

// form-data: 
// When Should You Use form-data?
// Uploading images, PDFs, or any files via API.
// Sending multipart form data from a Node.js server to another API.
// Handling file uploads in a full-stack application (React/Next.js + Node.js).
// The form-data package is used for handling multipart/form-data, which is commonly 
// used for file uploads in Node.js applications. It helps send form data, including files,
//  images, and other fields, to an API or backend server.
// Stream Support: Efficiently handles large file uploads by streaming data instead of loading everything into memory.
// Works with Axios & Fetch: Can be used with HTTP clients like axios to send form data in requests.


import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './config/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000
const app = express()

// Intialize Middlewares
app.use(express.json())
app.use(cors())
connectDB().then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error);
});

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));

// i used nodemon in package.json now to run the server just go to terminal and type "npm run server"
// if you don't use nodemon just type "npm run start"
