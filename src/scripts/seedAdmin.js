const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user/user');

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_API, {
            tlsAllowInvalidCertificates: true
        });

        console.log('MongoDB ulandi');

        const existingAdmin = await User.findOne({ role: 'admin' });

        if (existingAdmin) {
            console.log('Admin allaqachon mavjud:', existingAdmin.phone);
            process.exit();
        }

        const admin = await User.create({
            firstname: 'Azamat',
            lastname: 'Nabiyev',
            phone: '+998999999999', 
            password: 'yorvorish', 
            role: 'admin'
        });

        console.log('Admin yaratildi!');
        console.log('Tel:', admin.phone);
        process.exit();
    } catch (err) {
        console.error('Xatolik:', err);
        process.exit(1);
    }
}

seedAdmin();