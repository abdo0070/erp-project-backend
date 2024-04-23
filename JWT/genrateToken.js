const {sign} = require('jsonwebtoken');


const genrateToken = (payload) => {
    const token = sign({data : payload},process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
}

module.exports =  genrateToken;