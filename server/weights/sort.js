import { getFI } from "../index/indexes.js";

export const sortSuggestions = (suggestions) => {
    return new Promise((res , rej) => {
        try{
            const FI = getFI();
            let s_with_weights = [];
            for(let [key , val] of Object.entries(suggestions)){
                s_with_weights.push([val , key]);
            }

            s_with_weights.sort((a, b) => a[0] - b[0]);

            let finalSuggestions = [];

            for(let s of s_with_weights){
                finalSuggestions.push(FI[parseInt(s[1])]);
            }
            res(finalSuggestions);
        }
        catch(err){
            console.log(err);
            rej(err);
        }
    })
}