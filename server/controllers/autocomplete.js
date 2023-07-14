import { getRoot } from "../index/indexes.js";
export const sayHello = async(req , res,next) => {
    res.send("HELLO");
}

export const search = async(req , res,next) =>{
    const trie = getRoot();
    const {query} = req.body;
    const suggestions = await trie.search(query);
    res.status(200).json({suggestions});
}