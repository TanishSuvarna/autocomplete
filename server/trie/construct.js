import {sortSuggestions } from "../weights/sort.js";
import { addWeights } from "../weights/addWeights.js";
import { preprocess } from "../preprocessing/preprocessor.js";

class TrieNode {
    constructor() {
      this.children = Array(26).fill(null);
      this.pos = [];
      this.endOfWord = false;
    }
  }
  
export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        if(word.length){
            let currentNode = this.root;
            for (let i = 0; i < word.length; i++) {
                const char = word[i].toLowerCase();
                const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
                if (!currentNode.children[index]) {
                    currentNode.children[index] = new TrieNode();
                }
                currentNode = currentNode.children[index];
            }
            currentNode.endOfWord = true;
        }
        
    }

    search(sentence) {
        
        return new Promise(async (res , rej) => {

            try{
                console.time("Search Trie");
                sentence = await preprocess(sentence);
                let currentNode = this.root;
                let suggestions = new Map();
                let keys = [];
                for(let word of sentence){
                    
                        
                    
                    for (let j = 0 ; j < word.length; j++) {
                        const char = word[j].toLowerCase();
                        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
                        if (!currentNode.children[index]) {
                            break;
                        }
                        currentNode = currentNode.children[index]; //move to next char
                    }
                    
                    
                    currentNode.pos.forEach(value => {
                        //storing keys for fast lookup 
                        if(suggestions.value === undefined) keys.push(value);
                        suggestions[value] = (parseInt(suggestions[value])||0) + 1;
                    });
                    
                    // if(!suggestions.size) break;
                }
                console.timeEnd("Search Trie");

                        console.time("AddWeights");
                        const s_with_weights = await addWeights(keys , suggestions , sentence);
                        console.timeEnd("AddWeights");
                        
                        console.time("sorting with weights");
                        const s_with_weights_sort = await sortSuggestions(keys , s_with_weights);
                        console.timeEnd("sorting with weights");

                        res(s_with_weights_sort);
                    }
                
                
            catch(err){
                console.log(err)
                rej(err);
            }
        })
    }

    traverse(curr){
        if(!curr) curr = this.root;
        console.log(curr.pos);
        for(let i = 0 ; i < 26 ; i++){
            
            if(curr.children[i]){
                this.traverse(curr.children[i]);
            }
        }
    }
}

  