const ready = (cb: any) => {
	cb && (window[`${process.env.MODNAME}_READYLOADFLAG`] ? cb() : (window[`${process.env.MODNAME}_READYCB`] = cb));
};

const init = () => {
	window[`${process.env.MODNAME}_READYENVENT`] &&
		setTimeout(() => {
			document.dispatchEvent(window[`${process.env.MODNAME}_READYENVENT`]);
		}, 10);
};

export { ready, init };
