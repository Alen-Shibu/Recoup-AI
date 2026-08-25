import dotenv from "dotenv";
import mongoose from "mongoose";
import Case from "../models/case.model.js";

dotenv.config({quiet:true});

const failureTypes = [
  "insufficient_funds",
  "card_declined",
  "expired_card",
  "network_error",
  "bank_declined",
];

const customers = [
  "Rahul",
  "Arjun",
  "Ananya",
  "Neha",
  "Akhil",
  "Priya",
  "Vishnu",
  "Meera",
];

const generateCases = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    customerName: customers[i % customers.length],
    amount: Math.floor(Math.random() * 9000) + 500,
    failureType:
      failureTypes[Math.floor(Math.random() * failureTypes.length)],
    source: "synthetic",
    status: "pending",
    retryCount: Math.floor(Math.random() * 3),
    contactedAt: [],
  }));
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Case.deleteMany({ source: "synthetic" });

    const cases = generateCases();

    await Case.insertMany(cases);

    console.log(`${cases.length} synthetic cases inserted`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();