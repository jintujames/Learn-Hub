import express from 'express';
import {  stripePayment } from '../../Controller/PaymentController/paymentController'
const   paymentRouter = express.Router();


// paymentRouter.post('/SinglestripePayment',singleStripePayment)

paymentRouter.post('/stripePayment',stripePayment)


export default paymentRouter
