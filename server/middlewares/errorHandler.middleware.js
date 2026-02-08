import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    try {
        console.log(err);

        // Validation Error
        if (err.issues) {
            return res.status(err.statusCode || 400).json({
                message: err.message || "Validation failed",
                errors: err.issues
            });
        }

        // Other errors
        const errorMessage = err.message || 'Internal Server Error';
        const statusCode = err.statusCode || 500;
        const stackTrace = err.stack || null;

        if(process.env.NODE_ENV === 'development') {
            return res.status(statusCode).json({
                success: false,
                statusCode,
                msg: errorMessage,
                stackTrace
            })
        }

        return res.status(statusCode).json({
                success: false,
                statusCode,
                msg: errorMessage,
            })

        
    } catch (e) {
        console.log(`Error occured in the central error handling middleware`)
        console.log(e);
    }
}

export default errorHandler;