import m from "mithril";
import difficultyChoice from "./components/difficulty-choice/difficulty-choice";
import gameBoard from "./components/game-board/game-board";
import storage from "./components/storage/storage";
import "./styles/index.scss";

export const Main = {
	view: (vnode) => {
		return m(
			"div#mithril-wordle-app.main-container",
			!storage.wordLengthChoice && "Wordle using Mithril JS",
			!storage.wordLengthChoice ? m(difficultyChoice) : m(gameBoard)
		);
	},
};

export default Main;
