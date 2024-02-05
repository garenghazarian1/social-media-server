import mongoose from "mongoose";
import "dotenv/config";
import {uri, dbName } from "./env-vars.js"

//=====>   first way 

/* const connectDB = ()=>{
     mongoose.connect(uri, {dbName}).then(()=>{
         console.log("mongodb connected...", uri);
     }).catch((err)=>{
         console.log(err.message);
         mongoose.connection.on("connected", ()=>{
             console.log("Mongoose connected to db...", uri);
         });
         mongoose.connection.on("error", (err) =>{
             console.log(err.message); 
         });
         mongoose.connection.on("disconnected", () =>{
             console.log("Mongoose is disconnected", uri); 
         });
     })
 };
 export default connectDB;
*/

//=====>  second way

export default async function connectDB(){
    try {
        await mongoose.connect(uri);
        console.log("successful connected to DB");
    } catch (error) {
        console.log("error connecting to db", error.message);
    }
}

// third chat gpt professional way

/* const connectDB = async () => {
    const maxRetries = 5; // Maximum number of retries
    const retryInterval = 2000; // Time to wait between retries (in milliseconds)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await mongoose.connect(uri, {
            });
            console.log("Successfully connected to MongoDB.");

            // Connection Event Listeners
            mongoose.connection.on("connected", () => {
                console.log("Mongoose connection is open.");
            });

            mongoose.connection.on("error", (err) => {
                console.error(`Mongoose connection error: ${err.message}`);
            });

            mongoose.connection.on("disconnected", () => {
                console.log("Mongoose connection is disconnected.");
            });

            // Graceful Shutdown
            process.on("SIGINT", () => {
                mongoose.connection.close(() => {
                    console.log("Mongoose connection is disconnected due to application termination.");
                    process.exit(0);
                });
            });

            break; // Break out of the loop if the connection is successful
        } catch (error) {
            console.error(`Attempt ${attempt} to connect to MongoDB failed: ${error.message}`);
            if (attempt === maxRetries) {
                console.error('Max retries reached. Failed to connect to MongoDB.');
                throw error; // Rethrow the error or handle it as per your application's needs
            }
            console.log(`Retrying to connect in ${retryInterval / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval)); // Wait before retrying
        }
    }
};

export default connectDB;
 */



