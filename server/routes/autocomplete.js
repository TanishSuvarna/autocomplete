import { Router } from "express";
import {sayHello, search} from '../controllers/autocomplete.js'
const auto = Router();

auto.get("/" , sayHello);
auto.post("/search" , search);


export default auto