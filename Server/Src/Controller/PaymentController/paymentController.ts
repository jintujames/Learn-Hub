import { Request, Response } from "express";
import Stripe from "stripe";
import crypto from "crypto";
import Razorpay from "razorpay";
import courseModel from "../../Models/courseModel";
import orderModel from "../../Models/orderModel";
import CartItemModel from "../../Models/cartModel";

require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_KEY as string;
console.log(stripeSecretKey, "Keyy");

const stripe = new Stripe(
  "sk_test_51OuSGWSCJhkAyBQOSImlh99Sh8NfnqJIHFsRKYWCU0ABiVUFa8PgoqrkBGOjtlejeqdKW1FalK4eiRIFozEMYCw100JGmQKZ4g",
  {
    apiVersion: "2023-10-16",
  }
);

const singleStripePayment = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "bodyyyyyyyyyyyyyyy");

    const { courseDetails } = req.body;

    const line_item = {
      price_data: {
        currency: "INR",
        product_data: {
          name: courseDetails?.courseName,
          images: courseDetails?.image,
          description: courseDetails?.coursedescription,
          metadata: {
            id: courseDetails._id,
          },
        },
      },
    };
    console.log(line_item, "LINE ITEM");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [line_item],
      mode: "payment",
      billing_address_collection: "required",
      success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    console.log(session.payment_status, "status", process.env.CLIENT_URL);

    if (session.payment_status === "unpaid") {
      const userId = courseDetails?.userId;
      const tutorId = courseDetails?.instructor;
      const courseId = courseDetails._id;
      const amount = courseDetails?.coursefee;

      const order = await orderModel.create({
        studentId: userId,
        tutorId: tutorId,
        courseId: courseId,
        amount: amount,
      });

      await order.save();

      await courseModel.findByIdAndUpdate(courseId, {
        $push: { students: userId },
      });

      console.log("Order saved:", order);

      res.json({
        url: session.url,
        orderId: order._id, 
      });
    } else {
      res.status(400).json({ error: "Payment not completed yet." });
    }
  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ error: "Payment error" });
  }
};

const stripePayment = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "bodyyyyyyyyyyyyyyy");

    const line_items = req.body.cartItems.map((item: any) => {
      console.log(item, "ONE ITEM");

      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item?.course[0]?.courseName,
            images: item?.course[0]?.image,
            description: item?.course[0]?.coursedescription,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item?.course[0]?.coursefee * 100,
        },
        quantity: item?.quantity,
      };
    });
    console.log(line_items, "LINEITEMSSSS");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      billing_address_collection: "required",
      success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    console.log(session.payment_status, "status", process.env.CLIENT_URL);

    if (session.payment_status === "unpaid") {
      const orderPromises = req.body.cartItems.map(async (cartItem: any) => {
        const userId = cartItem?.user;
        const tutorId = cartItem?.course[0]?.instructor;
        const courseId = cartItem?.course[0]._id;
        const amount = cartItem?.course[0]?.coursefee;

        const order = await orderModel.create({
          studentId: userId,
          tutorId: tutorId,
          courseId: courseId,
          amount: amount,
        });

        await order.save();

       

        await courseModel.findByIdAndUpdate(courseId, {
          $push: { students: userId },
        });

        console.log("Order saved:", order);
        return order;
      });

      const orders = await Promise.all(orderPromises);

      res.json({
        status:true,
        url: session.url,
        orderIds: orders.map((order) => order._id),
        cart:req.body.cartItems
      });
    } else {
      res.status(400).json({ error: "Payment not completed yet." });
    }
  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ error: "Payment error" });
  }
};

export { singleStripePayment, stripePayment };
