const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

module.exports = () => {
  const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    company: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    phone : {
      type: Number,
      required: false,
      minLength: 9
    },
    nif: {
      type: Number,
      required: false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    verificationByEmailToken: {
      type: String,
      required: false
    },
    verificationByEmailExpires: {
      type: Date,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  })

  // encriptando senha antes de salvar no banco
  UserSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10)
    }

    next()
  })

  const User = mongoose.model('User', UserSchema)

  return { User }
}
