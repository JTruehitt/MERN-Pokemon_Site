import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// Hashes password before saving to database
userSchema.pre('save', async function (next) {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) {
        next();
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    }
);

// Checks input password vs hashed password in db
userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
