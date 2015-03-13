//*** This code is copyright 2003-2004 by Gavin Kistner, gavin@refinery.com
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code mostly satisfies the conditions.)

function AttachEvent(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
	else{
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){ MyFireEvent(obj,evt) };
	}
} 

//The following are for browsers like NS4 or IE5Mac which don't support either
//attachEvent or addEventListener
function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
}




location.keyVals = /\?.+/.exec(location.href)
location.keyVals = location.keyVals?(location.keyVals[0].substring(1).split('&')):[];
for (var i=0,len=location.keyVals.length;i<len;i++){
	var pair = location.keyVals[i].split('=');
	location.keyVals[pair[0]]=unescape(pair[1]);
}



/*
var debugOutInfo = {	debugLine:0,lastDebugMsg:null,debugMsgCount:0 }
function DebugOut(msg,verbosity,preventRepeats){
	// *** Set global variable 'debugLevel' to an integer. Higher numbers corresponds to more verbose.
	if (this.debugLevel==null || debugLevel<verbosity) return;
	if (preventRepeats){
		if (msg==debugOutInfo.lastDebugMsg){
			debugOutInfo.debugMsgCount++;
			return;
		}
		debugOutInfo.lastDebugMsg = msg;
	}

	var out = document.getElementById('debugoutput');
	if (debugOutInfo.debugMsgCount>0){
		var dupsMessge = "previous output repeated "+debugOutInfo.debugMsgCount+" times...";
		if (out)	out.innerHTML="#"+(debugLine)+": "+dupsMessge+"<br>"+out.innerHTML;
		else alert(dupsMessge);
		debugOutInfo.debugMsgCount=0;
	}
	if (out)	out.innerHTML="#"+(debugOutInfo.debugLine++)+": "+msg.replace(/\n/g,"<br>").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"<br>"+out.innerHTML;
	else alert(msg);
}

Date.prototype.asDuration=function( opts ){
	// See http://phrogz.net/JS/Date.prototype.asDuration.js
	var decs=/dec(\d*)/i, zero=/evenifzero/i;

	var f={}; f.s=1000; f.m=f.s*60; f.h=f.m*60; f.d=f.h*24; f.w=f.d*7; f.y=f.d*365.25;

	var pieces = [
		{ n:'ms',p:'ms',      s:'ms',     f:1   },
		{ n:'s', p:'seconds', s:'second', f:f.s },
		{ n:'m', p:'minutes', s:'minute', f:f.m },
		{ n:'h', p:'hours',   s:'hour',   f:f.h },
		{ n:'d', p:'days',    s:'day',    f:f.d },
		{ n:'w', p:'weeks',   s:'week',   f:f.w },
		{ n:'y', p:'years',   s:'year',   f:f.y }
	];

	var val = this.valueOf(),o='',opt,v,d,p;
	if (opts) for (var i=pieces.length-1;i>=0&&!d;i--){
		if (!(opt=opts[(p=pieces[i]).n])) continue;
		d=decs.exec(opt);
		if (val<p.f && !d && !zero.test(opt)) continue;
		v=val/p.f;
		v=d?(d[1]?v.toFixed(d[1]):v):v<<0;
		o+=v+' '+(v==1?p.s:p.p)+', ';
		val-=v*p.f;
	}
	return o.slice(0,-2);
}

if (typeof Number.prototype.toFixed!='function' || (.9).toFixed()=='0' || (.007).toFixed(2)=='0.00') Number.prototype.toFixed=function(f){
	if (isNaN(f*=1) || f<0 || f>20) f=0;
	var s='',x=this.valueOf(),m='';
	if (this<0){ s='-'; x*=-1; }
	if (x>=Math.pow(10,21)) m=x.toString();
	else{
		m=Math.round(Math.pow(10,f)*x).toString();
		if (f!=0){
			var k=m.length;
			if (k<=f){
				var z='00000000000000000000'.substring(0,f+1-k);
				m=z+m;
				k=f+1;
			}
			var a = m.substring(0,k-f);
			var b = m.substring(k-f);
			m = a+'.'+b;
		}
	}
	if (m=='0') s='';
	return s+m;
}
*/