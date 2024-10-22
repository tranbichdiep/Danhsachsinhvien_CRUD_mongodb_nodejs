// routes/students.js
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');

// Chuỗi kết nối MongoDB
const query = 'mongodb+srv://ahdiepvan333:ahdiepvan333@cluster0.xffxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Kết nối tới MongoDB
async function connectDB() {
    try {
        await mongoose.connect(query, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

// Gọi hàm kết nối đến MongoDB
connectDB();

// Thêm sinh viên
router.post('/save', async (req, res) => {
    const newStudent = new StudentModel(req.body); // Lấy dữ liệu sinh viên từ request body
    try {
        await newStudent.save();
        res.status(201).send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
    }
});

// Lấy tất cả sinh viên
router.get('/findall', async (req, res) => {
    try {
        const data = await StudentModel.find(); // Sử dụng async/await để lấy dữ liệu
        res.send(data); // Trả về danh sách sinh viên
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching data");
    }
});

// Lấy sinh viên đầu tiên có StudentId lớn hơn 99
router.get('/findfirst', async (req, res) => {
    try {
        const data = await StudentModel.findOne({ StudentId: { $gt: 99 } });
        res.send(data); // Trả về sinh viên đầu tiên tìm được
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching data");
    }
});

// Cập nhật thông tin sinh viên
router.post('/update', async (req, res) => {
    const { id, ...updateData } = req.body; // Lấy id và các dữ liệu cần cập nhật
    try {
        await StudentModel.findByIdAndUpdate(id, updateData, { new: true });
        res.send("Data updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating data");
    }
});

// Xóa sinh viên
router.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await StudentModel.findByIdAndDelete(id); // Sử dụng async/await
        res.send("Data deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
    }
});

// Xuất router
module.exports = router;
