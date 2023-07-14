import { getTFIDF } from "../index/indexes.js";

export const addWeights = (suggestions , words) => {
    return new Promise((res , rej) => {

        try{
            const TFIDF = getTFIDF();
            const s_with_words = {};
            
            for(let suggestion of suggestions){
                for(let word of words){
                    s_with_words[suggestion] = (parseFloat(s_with_words[suggestion]) || 0) + (TFIDF[suggestion] ? (parseFloat(TFIDF[suggestion][word]) || 0) : 0);
                }
    
            }
            // console.log(s_with_words)
            res(s_with_words);
        }
        catch(err){
            console.log(err);
            rej(err);
        }
    })

    
}