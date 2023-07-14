
class TrieNode {
    constructor() {
      this.children = Array(26).fill(null);
      this.endOfWord = false;
    }
  }
  
export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
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

    search(word) {
        let currentNode = this.root;
        let i = 0
        for (; i < word.length; i++) {
            const char = word[i].toLowerCase();
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!currentNode.children[index]) {
                break;
            }
            currentNode = currentNode.children[index];
        }
        return i === word.length && currentNode.endOfWord 
    }
}

  