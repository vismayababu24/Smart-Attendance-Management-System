import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);