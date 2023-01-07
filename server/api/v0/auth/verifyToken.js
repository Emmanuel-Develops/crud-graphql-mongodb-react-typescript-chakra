const {OAuth2Client} = require('google-auth-library');

const GOOGLE_CLIENT_ID = process.env.GOOG_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyCredentials(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return { payload }
    } catch (err) {
        return {error: err.message ?? "Invalid Credentials"}
    }
    
}

module.exports = verifyCredentials