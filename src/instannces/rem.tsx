(function (doc: Document, win: Window): void {
	const docEl = doc.documentElement;
	const resizeEvt: string = 'orientationchange' in window ? 'orientationchange' : 'resize';
	
	const recalc = (): void => {
	  // 获取设备的宽度和高度
	  const clientWidth: number = docEl.clientWidth;
	  const clientHeight: number = docEl.clientHeight;
	  
	  if (!clientWidth) return;
  
	  // html的fontsize = 设备的宽度 * 100 / 750
	  docEl.style.fontSize = (100 * clientWidth) / 750 + 'px';
	  docEl.style.width = (100 * clientWidth) / 100 + 'px';
	  docEl.style.height = (100 * clientHeight) / 100 + 'px';
	};
  
	// 确保浏览器支持事件监听
	if (!doc.addEventListener) return;
  
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
  
