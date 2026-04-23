const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name Required"]
  },

  username: {
    type: String,
    required: [true, "username required!"],
    unique: [true, "username already exist!"],
  },
  email: {
    type: String,
    required: [true, "email required!"],
    unique: [true, "email already exist!"],
    lowercase: true,
    match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid email!"],
  },
  phone: {
    type: Number,
    match: [/[+][9][1]-[6-9]\d{9}/, "Invalid phone number!"],
    default: null,
  },
  password: {
    type: String,
    required: [true, "password required!"],
  },

})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel