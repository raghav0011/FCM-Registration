const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/usersRegistration");
const { checkOwnership } = require("./middleware/CheckOwnershipMiddleware");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(checkOwnership);
app.use("/fcm/internal/", usersRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
