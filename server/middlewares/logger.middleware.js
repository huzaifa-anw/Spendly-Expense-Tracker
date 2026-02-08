const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} \nBody:`);
    console.dir(req.body, { depth: null });
    next();
}

export default logger;