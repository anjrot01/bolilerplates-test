const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      trim: true
    },
    adrress: {
      type: String,
      trim: true
    },
    permissions: [
      {
        type: String
      }
    ],
    roles: [
      {
        ref: "roles",
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("users", UserSchema);
