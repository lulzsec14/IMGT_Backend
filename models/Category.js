import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Same category already exists!"],
  },
});

const Category = mongoose.model("Category", categorySchema);
export { Category };
