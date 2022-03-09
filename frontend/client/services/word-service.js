import storage from "../components/storage/storage";

export const wordService = {
	getRandomWord: (length) => {
		const filtered = [];
		storage.words.forEach((word) => {
			if (word.length === length) {
				filtered.push(word);
			}
		});
		return filtered[Math.floor(Math.random() * filtered.length)];
	},
	getWords: async () => {
		const res = await fetch("https://random-word-api.herokuapp.com/all");
		const data = await res.json();
		return data;
	},
	getWordDefinition: async () => {
		const res = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${storage.randomWord}`
		);
		const data = await res.json();
		return data;
	},
};
