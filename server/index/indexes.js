//Indexing 
import { Trie } from "../trie/construct.js";

const F_Index = {};
const I_Index = {};
const W_Index_Sentences = {};
const W_Index_Queries = {};
const root = new Trie();
const TFIDF = {};
let totalQueries = 0; 

export const getFI = () => F_Index;
export const getII = () => I_Index;
export const getWIS = () => W_Index_Sentences;
export const getWIQ = () => W_Index_Queries;
export const getRoot = () => root;
export const getT = () =>{
    return totalQueries;
}
export const getTFIDF = () => TFIDF;
export const setT = (queries) =>{
    totalQueries = queries;
}

