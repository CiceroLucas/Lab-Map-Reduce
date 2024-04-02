const fs = require("fs");

function mapFunction(data) {
  const words = data.split(/\s+/);
  const wordCount = {};
  words.forEach((word) => {
    if (word in wordCount) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  });
  return wordCount;
}

function reduceFunction(word, counts) {
  const total = counts.reduce((acc, curr) => acc + parseInt(curr), 0);
  return `${word}: ${total}`;
}

function mapReduce(fileParts) {
  const mappedData = {};
  fileParts.forEach((part) => {
    const mappedPart = mapFunction(part);
    Object.keys(mappedPart).forEach((key) => {
      if (key in mappedData) {
        mappedData[key].push(mappedPart[key]);
      } else {
        mappedData[key] = [mappedPart[key]];
      }
    });
  });

  const reducedData = Object.entries(mappedData).map(([key, value]) =>
    reduceFunction(key, value)
  );
  return reducedData;
}

function fileGenerator(split, N, alphabet, minSize, maxSize) {
  const generateRandomWord = () => {
    const wordLength =
      Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    let word = "";
    for (let i = 0; i < wordLength; i++) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      word += randomChar;
    }
    return word;
  };

  const text = Array.from({ length: N }, generateRandomWord).join(" ");
  const words = text.split(/\s+/);
  const chunkSize = Math.ceil(words.length / split);
  const fileParts = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const part = words.slice(i, i + chunkSize).join(" ");
    fileParts.push(part);
  }

  return fileParts;
}

function saveToFile(data, filename) {
  fs.writeFileSync(filename, data.join("\n"));
}

const fileParts = fileGenerator(5, 100, ["a", "b", "c", "d", "e"], 3, 7);
const result = mapReduce(fileParts);

saveToFile(result, "result.txt");

console.log("save in result.txt");
