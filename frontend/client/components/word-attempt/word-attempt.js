import m from "mithril";
import letterCell from "../letter-cell/letter-cell";
import storage from "../storage/storage";

export const wordAttempt = {
	view: (vnode) => {
		const { attempting, gameWon, activeCellIndex } = vnode.attrs;
		const cells = Array(storage.wordLengthChoice).fill("-");
		return m(
			"div.attempt-container",
			cells.map((cell, index) => {
				return m(letterCell, {
					gameWon: gameWon,
					activeCellGroup: attempting,
					cellIndex: index,
					activeCellIndex: activeCellIndex,
				});
			})
		);
	},
};

export default wordAttempt;
