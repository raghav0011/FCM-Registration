const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  [
    {
      client_username: {
        type: String,
        required: true,
      },
      device_name: {
        type: String,
      },
      registration_id: {
        type: String,
      },
      blacklist: {
        type: String,
      },
      enable: {
        type: String,
      },
      app_version: {
        type: String,
      },
      app_version_code: {
        type: String,
      },
      device_os: {
        type: String,
      },
      device_name: {
        type: String,
      },
      logged_cell_number: {
        type: Number,
      },
    },
  ],
  {
    timestamps: true,
  }
);

module.exports = userSchema;
