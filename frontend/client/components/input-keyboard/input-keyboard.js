import m from "mithril";

export const inputKeyboard = {
	oninit: (vnode) => {
		const state = vnode.state;
		state.firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
		state.secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
		state.thirdRow = ["Back", "Z", "X", "C", "V", "B", "N", "M", "Enter"];
	},
	view: (vnode) => {
		const state = vnode.state;
		const { onClickFunc, onDeleteFunc, onEnterFunc, gameBoardState } =
			vnode.attrs;
		return m("div.input-keyboard", [
			m(
				"div.keyboard-row",
				state.firstRow.map((letter) => {
					return m(
						`button#letter-${letter}.keyboard-button`,
						{
							onclick: () => {
								onClickFunc(gameBoardState, letter);
							},
						},
						letter
					);
				})
			),
			m(
				"div.keyboard-row",
				state.secondRow.map((letter) => {
					return m(
						`button#letter-${letter}.keyboard-button`,
						{
							onclick: () => {
								onClickFunc(gameBoardState, letter);
							},
						},
						letter
					);
				})
			),
			m(
				"div.keyboard-row",
				state.thirdRow.map((letter, index) => {
					return m(
						`button#letter-${letter}.keyboard-button${
							index === 0 || index === state.thirdRow.length - 1
								? ".function-button"
								: ""
						}`,
						{
							onclick:
								index === 0
									? () => {
											onDeleteFunc(gameBoardState);
									  }
									: index === state.thirdRow.length - 1
									? () => {
											onEnterFunc(gameBoardState);
									  }
									: () => {
											onClickFunc(gameBoardState, letter);
									  },
						},
						letter
					);
				})
			),
		]);
	},
};

export default inputKeyboard;
