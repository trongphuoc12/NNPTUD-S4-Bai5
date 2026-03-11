const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://admin:admin123@cluster0.60ucvxj.mongodb.net/Baitap5_DB?retryWrites=true&w=majority";
        
        await mongoose.connect(uri, {
            // Thêm hai tùy chọn này để bỏ qua lỗi SSL
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true
        });
        
        console.log("MongoDB Connected successfully!");
    } catch (err) {
        console.error("Lỗi kết nối:", err.message);
    }
};

module.exports = connectDB;