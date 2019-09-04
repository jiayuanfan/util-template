(function(window: any, document: any) {
	// 资源路径变量
	const prevLoadOpt = JSON.parse(process.env.PRELOAD_OPTS || '') || {},
		_modName = prevLoadOpt['modName'],
		_readyName = _modName + '_READY',
		_readyEvent = document.createEvent('Event'),
		_readyLoadFlag = false,
		_readyCb = null,
		_appPath = prevLoadOpt['appPath'];

	// 需要加载的资源
	type ResourceList = string[];

	const scrList: ResourceList = prevLoadOpt['appScrList'],
		lkList: ResourceList = prevLoadOpt['appLkList'];

	// 资源动态变量
	const _libHost = prevLoadOpt['appHost'],
		_versionStr = `?v=${String(new Date().getTime())}`;

	/**
	 * 资源拼装完整路径
	 * @param rawList
	 */
	const _concatResource = (rawList: ResourceList): ResourceList =>
		rawList.map((fileStr: string) => `${_appPath}/${fileStr}`);

	/**
	 * 加载js
	 * @param url
	 * @param versionStr
	 */
	const _loadScript = (url: string, versionStr: string) => {
		return new Promise((resolve, reject) => {
			const scr = document.createElement('script');

			scr.type = 'text/javascript';
			scr.src = _libHost + url + versionStr;

			document.querySelectorAll('head')[0].appendChild(scr);

			scr.onload = () => {
				resolve();
			};

			scr.onerror = (error: any) => {
				console.error(error);
				reject(error);
			};
		});
	};

	/**
	 * 加载css
	 * @param url
	 * @param versionStr
	 */
	const _loadCSSLink = (url: string, versionStr: string) => {
		const lk = document.createElement('link');

		lk.type = 'text/css';
		lk.rel = 'stylesheet';
		lk.href = _libHost + url + versionStr;

		document.querySelectorAll('head')[0].appendChild(lk);
	};

	/**
	 * 开始加载所有js
	 * @param scrList
	 */
	const _startLoadScript = (scrList: ResourceList) => {
		let i = 0,
			loadFn = (elem: string) => {
				if (elem) {
					_loadScript(elem, _versionStr).then(() => {
						loadFn(scrList[++i]);
					});
				}
			};

		loadFn(scrList[i]);
	};

	/**
	 * 开始加载所有css
	 * @param lkList
	 */
	const _startLoadCSSLink = (lkList: ResourceList) => {
		lkList.forEach((elem: string) => {
			_loadCSSLink(elem, _versionStr);
		});
	};

	const _createReadyEvent = () => {
		_readyEvent.initEvent(_readyName, true, true);
		document.addEventListener(
			_readyName,
			function() {
				window[`${_modName}_READYLOADFLAG`] = true;
				window[`${_modName}_READYCB`] && window[`${_modName}_READYCB`]();
			},
			false
		);
	};

	// init load
	const startLoad = () => {
		_createReadyEvent();
		if (scrList.length > 0) _startLoadScript(_concatResource(scrList));
		if (lkList.length > 0) _startLoadCSSLink(_concatResource(lkList));
	};

	window[`${_modName}_READYNAME`] = _readyName;
	window[`${_modName}_READYENVENT`] = _readyEvent;
	window[`${_modName}_READYLOADFLAG`] = _readyLoadFlag;
	window[`${_modName}_READYCB`] = _readyCb;
	window[_modName] = {
		ready(cb: any) {
			window[`${_modName}_READYLOADFLAG`] ? cb && cb() : (window[`${_modName}_READYCB`] = cb);
		},
	};

	startLoad();
})(window, document);
