const express = require("express");
const path = require("path");
const helmet = require("helmet");
const contentSecurityPolicy = require("helmet-csp");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const viewRouter = require("./api/routes/view.routes");
const userAuthRouter = require("./api/routes/UserAuth");
const postRouter = require("./api/routes/post.route");
const authorRouter = require("./api/routes/author.route");
const globalErrorCatch = require("./api/utils/globalErrorCatch");
const app = express();

//configure rate limit obj
const limiter = rateLimit({
  windowMs: 25 * 60 * 1000, // 25 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 25 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//implement rate limit
app.use(limiter);

app.use(cors());

//security middleware - protect express app
// app.use(helmet());
// app.use(
//   contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'", "default.example", "data:", "blob:"],
//       scriptSrc: ["'self'", "https://*.cloudflare.com"],
//       objectSrc: ["'none'"],
//       connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
//       upgradeInsecureRequests: [],
//     },
//     reportOnly: false,
//   })
// );
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", "data:", "blob:"],
//       scriptSrc: ["'self'", "https://*.cloudflare.com"],
//       scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],
//       connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
//     },
//   })
// );

//set views and view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client/views"));

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //parse incoming cookie request

app.use("/public", express.static("src/client/public"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies)
  next();
});

// ****************** ROUTE MIDDLEWARES*******************//
app.use((req, res, next) => {
  res.locals.user = null;
  next();
});
app.use("/", viewRouter); //view Endpoint
app.use("/api/auth", userAuthRouter); //Authentication endpoint
app.use("/api/v1/blogs", postRouter); //general endpoint
app.use("/api/v1/author/blogs", authorRouter); //author specific endpoint


//Error handler for unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`${req.originalUrl} not found!`);
  (err.status = "fail"), (err.StatusCode = 404);
  next(err);
});
//Error Handler middleware
app.use(globalErrorCatch);
module.exports = app;
