const express = require('express');
const cors = require('cors');
const foodRouter = require('./routes/food');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');
const reservationRouter = require('./routes/reservation');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();
app.use(cors({
    origin: "http://localhost:8080", // frontend url
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
    
app.use('/foods', foodRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/users', userRouter);
app.use('/reservations', reservationRouter);

// agar route yo'q bo'lsa
app.all('*other', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorController);

module.exports = app;
