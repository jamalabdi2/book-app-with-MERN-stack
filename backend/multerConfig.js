const multer = require('multer');
const uuid = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const originalFilename = path.parse(file.originalname).name.replace(/\s/g, '');
        const uniqueSuffix = uuid.v4();
        const fileExension = path.extname(file.originalname)
        const newFilename = `${originalFilename}-${uniqueSuffix}${fileExension}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
