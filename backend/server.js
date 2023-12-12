require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Error in server.js \n ${err}`);
  });

// Terminate the server during uncaught exception
app.use((req, res, next) => {
  var domain = require("domain").create();

  domain.on("error", (err) => {
    console.log(`Error in server.js \n Domain error caught \n ${err.stack}`);

    try {
      setTimeout(() => {
        console.error("Failsafe shutdown");
        process.exit(1);
      }, 5000);

      var worker = require("cluster").worker;

      if (worker) {
        worker.disconnect();
      }

      server.close();

      try {
        next(err);
      } catch (err) {
        console.error("Express error mechanism failed \n", err.stack);
        res
          .status(500)
          .setHeader("content-type", "text/plain")
          .end("Server error");
      }
    } catch (err) {
      console.error("Unable to send 500 response.\n", err.stack);
    }
  });

  domain.add(req);
  domain.add(res);
  domain.run(next);
});
