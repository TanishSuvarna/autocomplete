import { solveTFIDF } from "../weights/calculate.js";
import { preprocess } from "../preprocessing/preprocessor.js";
import { getII } from "../index/indexes.js";
import { getRoot } from "../index/indexes.js";
export const init = async() => {
    console.time("init time")
    await preprocess();
    await solveTFIDF();
    const II = getII();
    const trie = getRoot();
    for(let word of Object.keys(II)){
        trie.insert(word);
    }
    for(let word of Object.keys(II)){
        trie.search(word);
    }
    console.timeEnd("init time")
}
