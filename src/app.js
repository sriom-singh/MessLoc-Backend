const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // PUT must be listed
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Mess Locator API </h1><p>API Version 1.0.0</p><p>Use the <u>/api/messes</u> endpoint to get a list of messes.</p>",
  );
});

app.use("/health", require("./routes/health.routes"));

app.use("/api/messes", require("./routes/mess.routes.js"));

module.exports = app;
