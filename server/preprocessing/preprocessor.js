import { getData } from "../static/user.js"
import natural from 'natural'
import {getFI,getII,getWIS,getWIQ,setT} from '../index/indexes.js'



const removeNonAlphanumeric = (string) => {
    return string.replace(/[^a-z0-9]/gi, '');
}
const index = async (stemmedTokens , id, WIS , WIQ ,FI ,II) => {
    return new Promise((res , rej) => {
        let totalLen = 0;


        // for(let word of stemmedTokens){
        //     if(!II.get(word)){
        //         II.set(word , [id]);
        //     }
        //     else II.set(word , [...II.get(word) , id]);
        // }


        // Caching Words To Sentences They Appear In

        try{
            for (let word of stemmedTokens) {
            
                if(!WIS[id] || !WIS[id][word]){ 
                    try {
                        if (word in II && Array.isArray(II[word])) {
                                II[word].push(id);
                        } else {
                            II[word] = [id];
                        }
                        } catch (err) {
                            console.log("Error occurred:");
                            console.log("II[word]:", II[word]);
                            console.log("word:", word);
                            console.error(err);
                        }
                }
                if(!WIS[id]){
                    WIS[id] = {};
                }
                if(!WIS[id][word]){
                    totalLen = parseInt(totalLen) + 1;
                    WIQ[word] = (parseInt(WIQ[word]) || 0) + 1;  //Increment freq of word in all queries
                    WIS[id][word] = 1;
                }            
                else WIS[id][word] = parseInt(WIS[id][word]) + 1; //Increment freq of word in a sentence
    
            }
            res();
        }
        catch(err){
            console.log(err);
            rej(err);
        }
    })    
}

const stem = (statement) => {
    if(statement){
        const stopwords = natural.stopwords


        // Tokenize the statement
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(statement);

        // Remove stopwords
        
        const filteredTokens = tokens.filter((token) => {
            token  = removeNonAlphanumeric(token);
            return !stopwords.includes(token.toLowerCase());
        })

        // Perform stemming on each token
        const stemmer = natural.PorterStemmer;
        const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));

        return stemmedTokens;
    }
    
    else return "";

}
const getTitle = (statement , len) => {
    let text = "";
    let s = 0 , e = statement.length;
    while(s < statement.length && statement[s] === ' ') s++;
    while(e > s && statement[e] == ' ') e--;
    if(s <= e){         
        while(len--) text += statement[s++];
    }
    return text;
}
export const preprocess = async (info) => {
    return new Promise(async (res , rej) => {
        const FI = getFI();
        const II = getII();
        const WIS = getWIS();
        const WIQ = getWIQ();
        if(!info){
            let queries = 100000;
            setT(queries);
            try{
                
                console.time('dataFromFile'); // Start the timer
                let data = await getData(queries);
                console.timeEnd('dataFromFile'); // Start the timer
                
                console.time('forLoop'); // Start the timer
                for(let query of data){
                    let text = query.text;
                    
                    //Converting Description to title(test dataset)
                    let title = getTitle(text , 60);
                    //Stemming And Removing StopWords
                    text = stem(text);
                    
                    //Inverted Indexing , Frequency Calc
                    
                    await index(text , query.id , WIS , WIQ ,FI ,II);

                    // Storing Key Value Pairs , Key is the 'id' and value is the title
                    FI[query.id] =  title;
                }
                
                console.timeEnd('forLoop'); // Start the timer
        
                //total unique val
                let total = 0;
        
                for(const [key , value] of Object.entries(II)){
                        
                    total = parseInt(total) + parseInt(value.length); 
                }
                const keyCount = Object.keys(II).length;
                console.log(parseInt(total)/parseInt(keyCount))
                res();
            }
            catch(err){
                console.log(err);
                rej();
            }
        }
    })
}



