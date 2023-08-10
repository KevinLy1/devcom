const { escape, unescape } = require('validator');

// Générer une phrase aléatoire
const generateRandomPhrase = () => {
  const phrases = [
    "Hello, <'world'>!",
    "It's a 'beautiful' day.",
    'Coding is fun & challenging.',
    "I like using 'JavaScript'."
  ];

  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

// Générer une phrase aléatoire et la log après encodage et décodage
const randomPhrase = generateRandomPhrase();
const encodedPhrase = escape(randomPhrase);
const decodedPhrase = unescape(encodedPhrase);

console.log('Phrase aléatoire :', randomPhrase);
console.log('Phrase encodée :', encodedPhrase);
console.log('Phrase décodée :', decodedPhrase);
