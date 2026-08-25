import mongoose from 'mongoose'

const caseSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required :true
    },
    amount:{
        type: Number,
        required :true
    },
    failureType:{
        type: String,
        required :true
    },
    source:{
        type: String,
        enum: ['real','synthetic'],
        required: true
    },
    status:{
        type: String,
        enum: ['pending','contacted','recovered','failed'],
        default: 'pending'
    },
    retryCount:{
        type: Number,
        default: 0
    },
    contactedAt: [ //This field is meant to track when you attempted to contact the customer during the recovery process.
      {
        type: Date,
      },
    ]
}, {
    timestamps: true
})

const Case = new mongoose.model('Case',caseSchema)

export default Case;