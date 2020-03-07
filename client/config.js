const dotenv = require('dotenv');
const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

dotenv.config();
const pkey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

module.exports = {
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL,
    NEXMO_PRIVATE_KEY: pkey,
    NEXMO_APPLICATION_ID: process.env.NEXMO_APPLICATION_ID,
    NEXMO_API_KEY: process.env.NEXMO_API_KEY,
    NEXMO_APP_SECRET: process.env.APP_SECRET,
    NEXMO_JWT: process.env.NEXMO_JWT,
    NEXMO_CONVERSATION_ID: process.env.NEXMO_CONVERSATION_ID,
    NEXMO_MEMBER_ID: process.env.NEXMO_MEMBER_ID
}
