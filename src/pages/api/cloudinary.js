const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

export default function handler(req, res) {
    const key = "YCG2pplXo1wQ8eNXAqgA--RXjH4"
    var timestamp = Math.round((new Date).getTime()/1000);
    var signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
       }, key);
    res.status(200).json({signature:signature})
  }
  