var requestLogger = function (req, res, next) {
    console.log("[ Request Log : " + req.url + " ]");
    next();
};

module.exports = requestLogger;