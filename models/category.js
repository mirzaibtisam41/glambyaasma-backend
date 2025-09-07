import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true, lowercase: true},
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

const Category = mongoose.model('Category', categorySchema);
export default Category;
