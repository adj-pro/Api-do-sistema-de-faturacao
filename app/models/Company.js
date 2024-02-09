const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = () => {
  const CompanySchema = new Schema({
    company_name: {
        type: String,
        unique: true,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    company_type:{
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  })

  const Company = mongoose.model('Company', CompanySchema)

  return { Company }
}
