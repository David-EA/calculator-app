import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: true 
    },
    expression: { 
        type: String, 
        required: true 
    },
    result: { 
        type: String, 
        required: true 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Calculation = mongoose.model('Calculation', calculationSchema);

export default Calculation;
