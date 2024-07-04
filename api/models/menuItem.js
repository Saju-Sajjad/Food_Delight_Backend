import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

export default model('MenuItem', menuItemSchema);
