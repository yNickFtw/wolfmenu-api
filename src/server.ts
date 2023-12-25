require("dotenv").config();
import "reflect-metadata";
import "./shared/container";
import express from "express";
import cors from "cors";
import MainRouter from "./shared/http/router";
import AssociationConfig from "./database/association-config";
import database from "./database/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(new MainRouter().init());

const port = process.env.PORT;

new AssociationConfig().init(() => {
  database.sync({ force: false })
    .then(() => {
      app.listen(port, () => {
        console.log("API RUNNING!")
      })
    })
    .catch((err) => {
      if (err) {
        console.log("Wops, something wrong! " + err);
      }
    })
})
