import { getRoot } from "../index/indexes.js";
export const sayHello = async(req , res,next) => {
    res.send("HELLO");
}

export const search = async(req , res,next) =>{
    const trie = getRoot();
    const {query} = req.body;
    console.time(`FULL SEARCH TIME FOR ${query}`)
    const suggestions = await trie.search(query);
    console.timeEnd(`FULL SEARCH TIME FOR ${query}`);
    res.status(200).json({suggestions});
}