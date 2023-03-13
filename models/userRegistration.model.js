const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    client_username: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    device_id: { type: String || Number, default: "" },
    device_name: {
      type: String || Number,
    },
    registration_id: {
      type: String || Number,
    },
    ip: {
      type: String || Number,
    },
    status: {
      type: String || Number,
    },
    app_version: {
      type: String || Number,
    },
    app_version_code: {
      type: String || Number,
    },
    device_os: {
      type: String || Number,
    },
    device_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
