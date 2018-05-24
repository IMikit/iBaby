module.exports = function (req, res, proceed) {
    let token;

    if (!req.headers || !req.headers.authorization) {
        return res.json(401, {err: 'Format is Authorization: Bearer token'});
    }

    let parts = req
        .headers
        .authorization
        .split(" ");
    if (parts.length != 2) {
        return res.json(401, {err: 'Format is Authorization: Bearer token'});
    }

    token = parts[1];

    jwt.verify(token, sails.config.jwt.jwtSecret, function (err, decoded) {
        if (err) {
            return res.json(401, {
                err: {
                    message: 'Token non valid'
                }
            });
        }
        req.user = decoded;
        next();
    })
};