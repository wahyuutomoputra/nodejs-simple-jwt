const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/books", require("./routes/bookRouter"));
app.use("/auth", require("./routes/authRouter"));

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
