require("dotenv").config();
import "reflect-metadata";
import "./shared/container";
import express from "express";
import cors from "cors";
import MainRouter from "./shared/http/router";
import AssociationConfig from "./database/association-config";
import database from "./database/config";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json({
  verify: (req: any, res, buf, encoding: any) => {
      if (buf && buf.length) {
          req.rawBody = buf.toString(encoding || 'utf8');
      }
    },
}));
app.use(new MainRouter().init());

const port = process.env.PORT;

new AssociationConfig().init(() => {
  database.sync({ force: true })
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
