import { getFI } from "../index/indexes.js";

export const sortSuggestions = (keys , suggestions) => {
    return new Promise((res , rej) => {
        try{
            const FI = getFI();
            let s_with_weights = [];
            console.time("O(n) s_with_weights");
            for(let suggestion  of keys){
                s_with_weights.push([suggestions[suggestion] , suggestion]);
            }
            console.timeEnd("O(n) s_with_weights");
            console.time("Sorting");
            s_with_weights.sort((a, b) => parseFloat(b[0])- parseFloat(a[0]));
            console.timeEnd("Sorting");
            let finalSuggestions = [] , filter = 12;
            console.time("O(n) finalSuggestions");
            for(let s of s_with_weights){
                // if(!filter) break;
                filter--;
                finalSuggestions.push(FI[parseInt(s[1])]);
            }
            console.timeEnd("O(n) finalSuggestions");
            res(finalSuggestions);
        }
        catch(err){
            console.log(err);
            rej(err);
        }
    })
}