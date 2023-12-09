require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.use((req, res, next) => {
  // Create a domain for this request
  var domain = require("domain").create();

  // Handle error on this domain
  domain.on("error", (err) => {
    console.log("DOMAIN ERROR CAUGHT \n", err.stack);
    try {
      // Failsafe shutdown in 5 seconds
      setTimeout(() => {
        console.error("Failsafe shutdown");
        process.exit(1);
      }, 5000);

      // Disconnect from the server
      var worker = require("cluster").worker;
      if (worker) {
        worker.disconnect();
      }

      // Stop taking new requests
      server.close();

      try {
        // Attempt to use Express error route
        next(err);
      } catch (err) {
        // If Express error route failed, try plain Node response
        console.error("Express error mechanism failed \n", err.stack);
        res.statusCode = 500;
        res.setHeader("content-type", "text/plain");
        res.end("Server error");
      }
    } catch (err) {
      console.error("Unable to send 500 response.\n", err.stack);
    }
  });

  // Add the request and response objects to the domain
  domain.add(req);
  domain.add(res);

  // Execute the rest of the request chain in the domain
  domain.run(next);
});

const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const changePasswordRouter = require("./routes/changePassword");
app.use("/changePassword", changePasswordRouter);

const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);

const dashboardRouter = require("./routes/dashboard");
app.use("/dashboard", dashboardRouter);

// Custom 404 page
app.use((req, res) => {
  res
    .status(404)
    .json({ status: "404: Not Found", message: "Unable to find the page" });
});

// Custom 500 page
app.use((err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({ status: "500: Internal Server Error", message: "Error in server" });
});
