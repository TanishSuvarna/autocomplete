import { solveTFIDF } from "./calculate.js";
import { preprocess } from "../preprocessing/preprocessor.js";

await preprocess();
const TFIDF = await solveTFIDF();
