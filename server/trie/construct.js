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
                sentence = await preprocess(sentence);
                let currentNode = this.root;
                let count = 0;
                let suggestions = new Set();
                for(let word of sentence){
                    
                        
                    
                    for (let j = 0 ; j < word.length; j++) {
                        const char = word[j].toLowerCase();
                        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
                        if (!currentNode.children[index]) {
                            break;
                        }
                        currentNode = currentNode.children[index]; //move to next char
                    }

                    if(count == 0){
                        currentNode.pos.forEach(value => {
                            suggestions.add(value);
                        });
                    
                    }
                    else{
                        const temp = [];
                        currentNode.pos.forEach(value => {
                            if(suggestions.has(value)){
                                temp.push(value);
                            }
                        });
                        suggestions = temp;
                    }
                    
    
                    
                    if(!suggestions.size) break;
                    count++; 
                }   
                    
                    if(count == sentence.length){
                        const s_with_weights = await addWeights(suggestions , sentence);
                        const s_with_weights_sort = await sortSuggestions(s_with_weights);
                        res(s_with_weights_sort);
                    }
                    else{
                        res("");
                    }
                        
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

  