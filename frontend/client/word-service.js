export const wordService = {
	wordsResponse: null,
	filterWordsByLength: (inputWords, length) => {
		const filteredWords = [];
		inputWords.forEach((word) => {
			if (word.length === length) {
				filteredWords.push(word);
			}
		});
		return filteredWords;
	},
	getWord: async () => {
		const response = await fetch("https://random-word-api.herokuapp.com/all");
		const data = await response.json();
		return data;
	},
};

export default wordService;
