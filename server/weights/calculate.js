import {getFI,getII,getWIS,getWIQ,getT} from '../index/indexes.js'


const get = (total , wis , wiq,queries) => {
    let TF = parseFloat(wis) / parseFloat(total);
    let IDF = Math.log10((parseFloat(queries) + 1)/parseFloat(wiq));

    return TF * IDF;
}
export const solveTFIDF = () => {
    return new Promise((res , rej) => {
        const FI = getFI();
        const II = getII();
        const WIS = getWIS();
        const WIQ = getWIQ();
        const queries = getT();
        try{
            const TFIDF = {};
            for(const [id , map] of Object.entries(WIS)){
                TFIDF[id] = {};
                let totalW = 0;
                for(const [word , freq] of Object.entries(map)){
                    totalW = parseInt(totalW) + parseInt(freq);
                }
                for(const [word , freq] of Object.entries(map)){
                    TFIDF[id][word] = get(totalW , freq , WIQ[word] , queries);
                }
            }
            res(TFIDF);
        }
        catch(err){
            console.log(err);
            rej(err);
        }
    })
}
