const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    phone: {
      type: String,
      required: true,
      minLength: 13,
      maxLength: 13,
    },
    password: {
      type: String,
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    telegramChatId: {
      type: String,
      select: false,
    },
    loginCode: {
      type: String,
      select: false,
    },
    loginCodeExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  // only run this function if password was actually modified

  if (!this.isModified("password")) return;

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
