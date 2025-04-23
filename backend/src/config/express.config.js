const  express = require('express') ;
const  cors =require('cors') ;
const app = express();
require('./db.config')
const router = require('./router.config')
const MulterError = require('multer')

// Debug middleware to log all incoming requests
app.use((req, res, next) => {
    console.log("📥 REQUEST:", req.method, req.url);
    console.log("🔍 HEADERS:", JSON.stringify(req.headers));
    console.log("📦 BODY (BEFORE PARSING):", req.body); // This will likely be undefined or empty
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware to log parsed body
app.use((req, res, next) => {
    console.log("📦 BODY (AFTER PARSING):", JSON.stringify(req.body));
    next();
});

// Router mounting point
app.use(router);

app.use((req, res, next) => {
    next({ status: 404, message: "Resource not found." });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error)
    let statusCode = error.status || 500;
    let message = error.message || "Server error ...";
    let details = error.details || null;

    // mongodb unique error
    if (error.code === 11000) {
        const uniqueFailedKeys = Object.keys(error.keyPattern)
        details = {}
        uniqueFailedKeys.map((field) => {
            details[field] = field + " should be unique"
        })
        statusCode = 400;
        message = "Validation error: Duplicate key";

    }


    // multer error handling (Image, video error)
    if (error instanceof MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            statusCode = 422,
                details = {
                    [error.field]: "File size too large. File must be less than 2MB"
                }
        }
    }
    // console.log(error)


    res.status(statusCode).json({
        result: details,// Include details if available
        message: message,  // Include the message
        meta: null
    });
});



module.exports = app;
