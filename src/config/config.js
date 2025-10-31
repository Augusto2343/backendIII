import "dotenv/config";

export default{
    MONGO_URL: process.env.MONGO_URL,
    TEST_MONGO_URL:process.env.TEST_MONGO_URL,
    PORT:process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    PASSWORD_USER: process.env.PASSWORD_USER
}