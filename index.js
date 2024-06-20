const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { getZaivka } = require("./table.controller");

const { addUser, loginUser } = require("./users.controller");
const { addZaivka } = require("./zaivka.controller");
const auth = require("./middlewares/auth");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/form", async (req, res) => {
  res.render("form", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/form", async (req, res) => {
  try {
    const { name, phone, problem } = req.body;
    await addZaivka(name, phone, problem);
    res.render("form", {
      title: "Express App",
      error: undefined,
    });
  } catch (error) {
    res.render("form", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/");
  } catch (e) {
    res.render("login", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);

    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res.render("register", {
        title: "Express App",
        error: "Такая почта уже существует",
      });
      return;
    }
    res.render("register", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });

  res.redirect("/login");
});

app.use(auth);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    applications: await getZaivka(),
    error: false,
  });
});

mongoose
  .connect(
    "mongodb+srv://poalrom:qwe123@cluster0.27rcxyy.mongodb.net/medic?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on poort ${port}...`));
    });
  });
