const express = require('express');
const app = express();
const connectDB = require('./config/db'); 

// 1. Gọi hàm kết nối DB trước
connectDB(); 

app.use(express.json());

// 2. Sử dụng Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// Root routes
app.post('/enable', require('./controllers/userController').enableUser);
app.post('/disable', require('./controllers/userController').disableUser);

app.listen(3000, () => console.log("Server running on port 3000"));