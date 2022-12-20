const express = require("express");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const userAuthRouter = require("./api/routes/UserAuth");
const postRouter = require("./api/routes/post.route");
const authorRouter = require("./api/routes/author.route");
const globalErrorCatch = require("./api/utils/globalErrorCatch");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure rate limit obj
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//security middleware - protect express app
app.use(helmet());

//implement rate limit
app.use(limiter);

// ******************MIDDLEWARES*******************//

app.use("/api/auth", userAuthRouter);
app.use("/api/v1/blogs", postRouter); //general endpoint
app.use("/api/v1/author/blogs", authorRouter); //author specific endpoint

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page of the Blog API");
});

//Error handler for unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`${req.originalUrl} not found!`);
  (err.status = "fail"), (err.StatusCode = 404);
  next(err);
});
//Error Handler middleware
app.use(globalErrorCatch);
module.exports = app;
