import dotenv from "dotenv";
dotenv.config();
import sequelize, { testDBConnection } from "./db";

import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => (res.send("Hello, World!")));

async function start() {
  try {
    await testDBConnection();
    await sequelize.sync();

    app.listen(PORT, () => console.log(
      `Listening on port ${ PORT }`
    ));
  }
  catch(err) {
    console.error("Couldn't connect to DB:\n", err);
  }
}

start();
