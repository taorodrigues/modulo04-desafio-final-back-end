import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const gradeModel = mongoose.model('grade', gradeSchema, 'grade');

export { gradeModel };
