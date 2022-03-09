import m from "mithril";
import { wordService } from "../../services/word-service";
import { choiceButton } from "../choice-button/choice-button";
import storage from "../storage/storage";

export const difficultyChoice = {
	oninit: (vnode) => {
		const state = vnode.state;
		state.wordLengthArray = [5, 6, 7, 8];
	},
	view: (vnode) => {
		const state = vnode.state;
		if (!storage.words.length) {
			wordService.getWords().then((data) => {
				storage.words = data;
				m.redraw();
			});
		}
		return storage.words.length
			? m(
					"div.length-choices-container",
					state.wordLengthArray.map((length) => {
						return m(choiceButton, { choiceLength: length });
					})
			  )
			: m("div.loading-message", "Loading Words...");
	},
};

export default difficultyChoice;
