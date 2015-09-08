module.exports = {
    port   : process.env.PORT,
    twitter: {
        consumer_key       : process.env.TWITTER_CONSUMER_KEY,
        consumer_secret    : process.env.TWITTER_CONSUMER_SECRET,
        access_token       : process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET
    }
};
