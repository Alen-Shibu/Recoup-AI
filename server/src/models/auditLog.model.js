import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },

  stage: {
    type: String,
    enum: ["diagnosis", "decision", "action"],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  reasoning: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;