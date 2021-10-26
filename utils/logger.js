var requestLogger = function (req, res, next) {
    console.log("Client Requested asset : [" + req.url + "]");
    next();
};

module.exports = requestLogger;