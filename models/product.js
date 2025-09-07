import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    discountPrice: {type: Number},
    image: {type: String, required: true},
    isFeatured: {type: Boolean, default: false},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
    toObject: {virtuals: true},
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
