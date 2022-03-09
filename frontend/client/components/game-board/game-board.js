import m from "mithril";
import { wordService } from "../../services/word-service";
import inputKeyboard from "../input-keyboard/input-keyboard";
import storage from "../storage/storage";
import wordAttempt from "../word-attempt/word-attempt";

export const gameBoard = {
	oninit: (vnode) => {
		const state = vnode.state;
		state.tries = Array(storage.wordLengthChoice).fill("");
		state.tryCount = 0;
		state.letterCount = 0;
		state.gameWon = null;
		state.wordDefinition = "";
	},
	view: (vnode) => {
		const state = vnode.state;
		return m("div.game-board-container", [
			m(
				"div.grid",
				state.tries.map((val, index) => {
					return m(wordAttempt, {
						attempting: index === state.tryCount,
						gameWon: state.gameWon,
						activeCellIndex: state.letterCount,
					});
				})
			),
			state.wordDefinition &&
				m("div.correct-answer-container", [
					m("div.correct-answer-word", `The word is "${storage.randomWord}".`),
					m(
						"div.correct-answer-definition",
						state.wordDefinition.length
							? state.wordDefinition
							: "No definition available"
					),
				]),
			m(inputKeyboard, {
				onClickFunc: gameBoard.onLetterClick,
				onDeleteFunc: gameBoard.onBackspaceClick,
				onEnterFunc: gameBoard.onSubmitButtonClick,
				gameBoardState: state,
			}),
		]);
	},
	onSubmitButtonClick: (state) => {
		const cells = [];
		for (let i = 0; i < storage.wordLengthChoice; i++) {
			if (
				document.getElementById(`active-cell-${i}`) &&
				document.getElementById(`active-cell-${i}`).value
			) {
				cells.push(document.getElementById(`active-cell-${i}`).value);
			}
		}
		if (state.gameWon !== false) {
			if (cells.length === storage.wordLengthChoice) {
				if (cells.join("").toLowerCase() === storage.randomWord.toLowerCase()) {
					wordService.getWordDefinition().then((data) => {
						state.wordDefinition =
							data[0].meanings[0].definitions[0]?.definition;
						state.gameWon = true;
						m.redraw();
					});
				} else {
					state.tryCount += 1;
					state.letterCount = 0;
				}
				if (state.tryCount > storage.wordLengthChoice - 1) {
					wordService.getWordDefinition().then((data) => {
						state.wordDefinition =
							data[0].meanings[0].definitions[0]?.definition;
						state.gameWon = false;
						m.redraw();
					});
				}
				m.redraw();
			} else {
				console.log("invalid word");
			}
		} else {
			storage.wordLengthChoice = null;
			m.redraw();
		}
	},
	onLetterClick: (state, letter) => {
		if (
			document.getElementById(`active-cell-${state.letterCount}`).value === ""
		) {
			document.getElementById(`active-cell-${state.letterCount}`).value =
				letter;
		}
		if (state.letterCount + 1 < storage.wordLengthChoice) {
			state.letterCount += 1;
		}
	},
	onBackspaceClick: (state) => {
		if (
			document.getElementById(`active-cell-${state.letterCount}`).value !== ""
		) {
			document.getElementById(`active-cell-${state.letterCount}`).value = "";
			if (state.letterCount - 1 >= 0) {
				state.letterCount -= 1;
			}
		} else {
			if (document.getElementById(`active-cell-${state.letterCount - 1}`)) {
				document.getElementById(`active-cell-${state.letterCount - 1}`).value =
					"";
				if (state.letterCount - 2 >= 0) {
					state.letterCount -= 2;
				} else {
					if (state.letterCount - 1 >= 0) {
						state.letterCount -= 1;
					}
				}
			}
		}
	},
};

export default gameBoard;
