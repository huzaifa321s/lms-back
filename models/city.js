import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

const City = mongoose.model('City', citySchema);

export default City;
