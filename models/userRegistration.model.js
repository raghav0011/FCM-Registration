const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  [
    {
      CLIENT_USERNAME: {
        type: String,
        required: true,
      },
      DEVICE_NAME: {
        type: String,
      },
      REGISTRATION_ID: {
        type: String,
      },
      BLACKLIST: {
        type: String,
      },
      ENABLE: {
        type: String,
      },
      APP_VERSION: {
        type: String,
      },
      APP_VERSION_CODE: {
        type: String,
      },
      DEVICE_OS: {
        type: String,
      },
      DEVICE_NAME: {
        type: String,
      },
      LOGGED_CELL_NUMBER: {
        type: Number,
      },
    },
  ],
  {
    timestamps: true,
  }
);

module.exports = userSchema;
