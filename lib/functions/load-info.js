module.exports = (req, file) => {
    const ip = (req.ip.substr(0, 7) == "::ffff:") ? req.ip.substr(7) : req.ip;
    console.log("Load " + file + " [" + ip + "]");
}