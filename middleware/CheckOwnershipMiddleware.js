const { error } = require("../Response/ApiResponse");
require("dotenv").config();

const ownerShipArray = process.env.OWNERSHIP_ARRAY;

function checkOwnership(req, res, next) {
  const collectionName = req.query.ownership;
  if (ownerShipArray.includes(collectionName)) {
    req.collectionName = collectionName; // set the collection name in the request object
    next();
  } else {
    res.status(404).json(error("Page not found", res.statusCode));
  }
}

module.exports = { checkOwnership };
