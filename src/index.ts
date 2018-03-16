import * as express from "express";
import { Api } from "./app";

let api: Api = new Api(express());
api.run();