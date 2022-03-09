import m from "mithril";
import { wordService } from "../../services/word-service";
import { storage } from "../storage/storage";

export const choiceButton = {
	view: (vnode) => {
		const { choiceLength } = vnode.attrs;
		return m(
			"button.choice-button",
			{
				onclick: () => {
					storage.wordLengthChoice = choiceLength;
					storage.randomWord = wordService.getRandomWord(choiceLength);
					m.redraw();
				},
			},
			`${choiceLength} Letters`
		);
	},
};

export default choiceButton;
