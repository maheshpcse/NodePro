require('dotenv').config();

module.exports = {
    server: {
        host: process.env.HOST,
        port: process.env.PORT
    },
    database: {
        host: process.env.DB_HOST,
        db: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        securitykey: process.env.SECURITY_KEY
    },
    file_upload_path: {
        directory: '../../../public/profiles/'
    },
    errorMsg: {
        view: 'Not allowed to get data',
        add: 'Not allowed to add data',
        update: 'Not allowed to update data',
        delete: 'Not allowed to delete data',
        restore: 'Not allowed to restore data'
    }
}