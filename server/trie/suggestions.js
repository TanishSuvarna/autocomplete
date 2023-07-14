


export const assignSuggestions = (root,prefix,II) => {
    return new Promise(async (resolve, reject) => {
        try {
          if (!root) {
            resolve({pos : []});
          } else {
            const suggestions = new Set();
    
            if (root.endOfWord) {
              for (let sentence of II[prefix]) {
                suggestions.add(sentence);
              }
            }
            for (let i = 0; i < 26; i++) {
              const childPrefix = prefix + String.fromCharCode('a'.charCodeAt(0) + i);
              let temp = await assignSuggestions(root.children[i], childPrefix, II);
              for (let sentence of temp.pos) {
                suggestions.add(sentence);
              }
            }
            
            root.pos = Array.from(suggestions);
            resolve({ pos: suggestions });
          }
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
}
