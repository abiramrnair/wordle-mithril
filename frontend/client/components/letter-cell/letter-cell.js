import m from "mithril";
import storage from "../storage/storage";

export const letterCell = {
	oninit: (vnode) => {
		const state = vnode.state;
		state.cellValue = null;
	},
	view: (vnode) => {
		const { activeCellGroup, cellIndex, gameWon } = vnode.attrs;
		const state = vnode.state;
		const positionalClassName = letterCell.getPositionalClassName(
			cellIndex,
			activeCellGroup,
			state,
			gameWon
		);
		if (
			activeCellGroup &&
			document.getElementById(`active-cell-${cellIndex}`)
		) {
			state.cellValue = document
				.getElementById(`active-cell-${cellIndex}`)
				.value.toLowerCase();
		}
		return m(
			`input${activeCellGroup ? `#active-cell-${cellIndex}` : ""}.letter-cell.${
				!activeCellGroup && !state.cellValue
					? "disabled"
					: (gameWon || !activeCellGroup) && state.cellValue
					? "attempted"
					: ""
			}.${positionalClassName}`,
			{
				maxlength: 1,
			},
			"Cell"
		);
	},
	getPositionalClassName: (cellIndex, activeCellGroup, state, gameWon) => {
		if ((gameWon || !activeCellGroup) && state.cellValue) {
			if (storage.randomWord[cellIndex].toLowerCase() === state.cellValue) {
				if (
					state.cellValue &&
					document.getElementById(`letter-${state.cellValue.toUpperCase()}`)
				) {
					document
						.getElementById(`letter-${state.cellValue.toUpperCase()}`)
						.classList.add("green-letter");
				}
				return "green-cell";
			} else if (storage.randomWord.includes(state.cellValue)) {
				if (
					state.cellValue &&
					document.getElementById(`letter-${state.cellValue.toUpperCase()}`)
				) {
					document
						.getElementById(`letter-${state.cellValue.toUpperCase()}`)
						.classList.add("yellow-letter");
				}
				return "yellow-cell";
			} else {
				if (
					state.cellValue &&
					document.getElementById(`letter-${state.cellValue.toUpperCase()}`)
				) {
					document
						.getElementById(`letter-${state.cellValue.toUpperCase()}`)
						.classList.add("checked-letter");
				}
				return "grey-cell";
			}
		}
		return "";
	},
};

export default letterCell;
