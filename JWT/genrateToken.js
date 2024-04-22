const {sign} = require('jsonwebtoken');


const genrateToken = (payload) => {
    const token = sign(payload,process.env.JWT_KEY);
    return token;
}

module.exports =  genrateToken;