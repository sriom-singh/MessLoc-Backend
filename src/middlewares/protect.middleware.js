const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.sendStatus(401);
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();
    } catch {
        return res.sendStatus(401);
    }
};
