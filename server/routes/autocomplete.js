import { Router } from "express";
import {sayHello} from '../controllers/autocomplete.js'
const auto = Router();

auto.get("/" , sayHello);

export default auto