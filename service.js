
document.querySelectorAll('.btn').forEach( el => {
	el.addEventListener('click', (ev) => {
		if(el.id.endsWith("_all")) {
			let ll = el.id.length;
			let ex = el.id.substring(0, ll-4);
			let c1 = 0, c2 = 0;
			let ee = ex.substring(ex.indexOf("_"));
			document.querySelectorAll('.edit').forEach( elm => {
				if(elm.id.endsWith(ee)) {
					c1++; if(elm.style.color=='red') c2++;
					elm.style.color = 'red';
					elm.style.background = 'lightblue';
				}
			});
//			alert('AA='+c1+'='+c2);
			if(c1==c2) {
				document.querySelectorAll('.edit').forEach( elm => {
					if(elm.id.endsWith(ee)) {
						elm.style.color = 'black';
						elm.style.background = 'white';
					}
				});
			}
		} else {
			let res = [];
			let ee = el.id.substring(el.id.indexOf("_"));
			document.querySelectorAll('.edit').forEach( elm => {
				if(elm.style.color=='red' && elm.id.endsWith(ee)) {
					res.push(elm);
				}
			});
			if(res.length>0) {
				let dlg = el.id + "_dlg";
				window.list = res;
				var dialog = document.getElementById(dlg);
				dialog.show();
/*
				for (let i in res) {
					res[i].style.color = 'black';
					res[i].style.background = 'white';
				}
*/
			} else {
				alert("Please select some to edit");
			}
		}
	});
});

document.querySelectorAll('.edit').forEach(el=> {
  el.style.color = 'black'
  el.addEventListener('click', (ev) => {
	if(el.style.color=='black') {
      el.style.color = 'red'
      el.style.background = 'lightblue'
    } else {
      el.style.color = 'black'
      el.style.background = 'white'
    }
  });
});

document.querySelectorAll('#reload').forEach( el => {
	el.addEventListener('click', (ev) => {
		reload();
	});
});

function reload() {
	getdata(orgid);
}

function reload2() {
	let orgs = orgids.join("_");
	getdata(orgs);
}

function getdata(oid) {
	let url = "read?t="+Math.random()+"&orid="+oid;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let x = this.responseText;
			window.xx = x;
			let xs = x.split("\n");
			for(let i=0; i<xs.length; i++) {
				let kv = xs[i].split("=");
				let k = kv[0];
				let v = kv[1];
				let inp = document.getElementById(k);
				if(inp!= null)
				inp.innerHTML = v;
			}
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

document.querySelectorAll('.runbtn').forEach(el=> {
	el.addEventListener('click', (ev) => {
		let dlg = el.id.replace("run","dlg");
		var dialog = document.getElementById(dlg);
		res = window.list;

		let vid = el.id.replace("run","val");
		let inp = document.getElementById(vid);
		let val = inp.value;

		let url = "save?t="+Math.random();
		url += "&orid="+ orgid;
		for (let i in res) {
			url += "&"+res[i].id+"="+val;
			res[i].style.color = 'black';
			res[i].style.background = 'white';
		}
		dialog.close();
//		alert('SEND: ' + url);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let x = this.responseText;
				let xs = x.split("\n");
				let ln = "";
				for(let i=0; i<xs.length; i++) {
					let kv = xs[i].split("=");
					let k = kv[0];
					let v = kv[1];
					let inp = document.getElementById(k);
					inp.innerHTML = v;
					if(i>0) ln += "\n";
					ln += "SET '"+k+"' = '"+v+"'";
				}
//				alert(ln);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();

	});
});

document.querySelectorAll('.canbtn').forEach(el=> {
	el.addEventListener('click', (ev) => {
		let dlg = el.id.replace("can","dlg");
		var dialog = document.getElementById(dlg);
		dialog.close();
		res = window.list;
		for (let i in res) {
			res[i].style.color = 'black';
			res[i].style.background = 'white';
		}
	});
});

//reload();

