const _setImmediate = setImmediate;
const _clearImmediate = clearImmediate;
process.once('loaded', () => {
  window.title = "Taiko No Tatsujin";
  window.onload = function () {
	var styl = document.createElement("style");
	styl.innerHTML = '.crdx:before { content: "Powered by Sebby.dev";}';
	document.head.appendChild(styl);
	var x = document.getElementById('version-link');
	x.classList.add('crdx');
    setInterval(function() {
	  var x = document.getElementById('version-link');
	  x.href = 'https://sebby.dev/';
	  x.innerText = 'Powered by Sebby.dev';
	  x.setAttribute("alt", "Powered by Sebby.dev");
	}, 1e3);
  }
});