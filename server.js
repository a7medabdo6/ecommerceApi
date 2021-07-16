const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
var cors = require("cors");
const path = require("path");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const hbs = require("hbs");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "ar",
    backend: {
      loadPath: "./locals/{{lng}}/translation.json",
    },
  });

//Connect Database
connectDB();
//Init Middleware
const partialPath = path.join(__dirname, "views/partials");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(middleware.handle(i18next));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.t("404"));

  res.render("index");
});

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(cookieParser());
//Define route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/users/admin", require("./routes/api/admin/users"));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/auth/admin", require("./routes/api/admin/auth"));

app.use("/api/", require("./routes/api/category"));
app.use("/api/", require("./routes/api/product"));
app.use("/api/", require("./routes/api/cart"));
app.use("/api/", require("./routes/api/mainImages"));

app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ports ${PORT} `);
});
