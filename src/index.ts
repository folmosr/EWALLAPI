import * as express from 'express'
import { Api } from './app'

let api = new Api(express());
api.run();