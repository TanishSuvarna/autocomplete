import { solveTFIDF } from "../weights/calculate.js";
import { assignSuggestions } from "../trie/suggestions.js";
import { preprocess } from "../preprocessing/preprocessor.js";
import { getII ,getRoot } from "../index/indexes.js";
export const init = async() => {
    try{
        console.time("init time")
        await preprocess();
        await solveTFIDF()
        const II = getII();
        const trie = getRoot();
        for(let word of Object.keys(II , "")){
            trie.insert(word);
        }
        await assignSuggestions(trie.root ,"",II)
        // trie.traverse() //test 
        console.timeEnd("init time")
    }
    catch(err){
        
        console.log(err);
    }
}

