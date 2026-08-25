import express from 'express'
import Case from '../models/case.model.js'

const router = express.Router()

router.post("/razorpay", async (req, res) => {
  try {
    const event = req.body;

    console.log("Razorpay webhook received:");
    console.log(JSON.stringify(event, null, 2));

    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;

      const newCase = await Case.create({
        customerName: payment.email || "Unknown Customer",
        amount: payment.amount / 100,
        failureType:
          payment.error_code || "payment_failed",
        source: "real",
        status: "pending",
        retryCount: 0,
        contactedAt: [],
      });

      console.log("Real case created:", newCase._id);
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
});

export default router;