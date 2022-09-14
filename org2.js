
/*
document.querySelectorAll('.data').forEach(el=> {
	let id = el.id;
	el.innerHTML = id
//	console.log('elem:', el);
});
*/

function reload() {
	let url = "org-state0?t="+Math.random();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let x = this.responseText;
//			alert('STATE',x);
			let xs = x.split("\n");
			let ln = "";
			for(let i=0; i<xs.length; i++) {
				let kv = xs[i].split("=");
				let k = kv[0];
				let v = kv[1];
				if(k=='') continue;
				let inp = document.getElementById(k);
				if(inp==null) continue;
				inp.innerHTML = v;
				if(i>0) ln += "\n";
				ln += "SET '"+k+"' = '"+v+"'";
			}
//alert(ln);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

reload();

