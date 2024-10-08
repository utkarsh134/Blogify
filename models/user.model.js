const { Schema, default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser} = require("../services/auth.js")

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  // console.log(`hashedPassword at the time of signup: ${hashedPassword}`)

  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  //   console.log(user);
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // console.log(`hashedPassword at the time of signin: ${hashedPassword} \n userProvidedHash at the time of signin: ${userProvidedHash}`)
  if (hashedPassword !== userProvidedHash){
    console.log(hashedPassword !== userProvidedHash);
    throw new Error("Incorrect Password");
  }
  // console.log("Hello") ;
  const token = createTokenForUser(user); 
  // console.log(token) ;
  return token ;
});

const User = mongoose.model("user", userSchema);
module.exports = User;
