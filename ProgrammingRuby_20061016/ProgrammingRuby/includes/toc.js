/*
debugLevel=1;
startTime=lapTime=new Date();

function stopwatch(msg){
	var now = new Date();
	var total = new Date( now-startTime ); 
	var lap = new Date( now-lapTime ); 
	lapTime=now;
	msg+=' '+total.asDuration({s:'dec2'})+" (+ "+lap.asDuration({s:'dec2'})+")";
	DebugOut(msg,1);
}
*/

/* Expand/Collapse Menu */
AttachEvent(window,'load',function(){
	var showTitle = 'Click to show subsections';
	var hideTitle = 'Click to hide subsections';
	
	function Glow(evt){
		GlowIt(evt||null,true);
	}
	function DeGlow(evt){
		GlowIt(evt||null,false);
	}
	function GlowIt(evt,glow,img){
		if (!img){
			if (!evt && window.event) evt=window.event;
			if (!evt) return alert("ERROR! Can't find event object for glow.");
			img = evt.target || evt.currentTarget || evt.srcElement;
		}
		//if (img.src.indexOf('dot')!=-1) return;
		img.src=img.src.replace(/(-glow)?.gif/,(glow?'-glow':'')+".gif");
	}	

	function ShowSub(evt){
		//DebugOut('ShowSub('+evt+')',1);
		ShowIt(evt||null,true);
	}
	function HideSub(evt){
		//DebugOut('HideSub('+evt+')',1);
		ShowIt(evt||null,false);
	}
	function ShowIt(evt,show,img){
		if (!img){
			if (!evt && window.event) evt=window.event;
			if (!evt) return alert("ERROR! Can't find event object for Show.");
			img = evt.target || evt.currentTarget || evt.srcElement;
		}
		var ul = img.ul;
		ul.style.display = show ? "block":"none";
		if (show){
			img.src=img.src.replace(/e(-glow)?.gif/i,'c.gif');
			img.title=hideTitle;
			img.onclick=HideSub;
		}else{
			img.src = img.src.replace(/c(-glow)?.gif/i,'e.gif');
			img.title=showTitle;
			img.onclick=ShowSub;

			var subs = img.li.getElementsByTagName('img');
			for (var i=0,len=subs.length;i<len;i++){
				var sub=subs[i];
				if (sub==img || !sub.ul) continue;
				ShowIt(null,false,sub);
			}
		}
	}

	function Initialize(){
		var imgs = document.getElementsByTagName('img');
		var ere = /e.gif$/i;
		for (var i=0,len=imgs.length;i<len;i++){
			var img = imgs[i];
			if (!ere.test(img.src)) continue;

			var li = img.parentNode;
			var depth=li.getAttribute('d')*1;
			var subs = li.getElementsByTagName('li');
			if (subs.length<=2 && depth>2){
				img.src='i/d.gif';
				continue;
			}

			img.title=showTitle;
			img.className='link';
			img.ul = li.getElementsByTagName('ul')[0];
			img.li = li;

			img.onmouseover=Glow;
			img.onmouseout=DeGlow;
			img.onclick=ShowSub;

			ShowIt(null,li.className=='open',img);
		}
	}
	
	Initialize();
	//stopwatch("Expd done:");
},false);

/* Sync */
/*
AttachEvent(window,'load',function(){
	var anchors = document.getElementsByTagName('a');
	for (var i=0,len=anchors.length;i<len;i++) anchors[i].onclick=SyncChanges;
	//stopwatch("Sync done:");
},false);
*/

function SyncChanges(evt,page,hash){
	var linkmap = {
		cover:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo',
		foreword:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Foreword',
		preface:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Preface',
		roadmap:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Roadmap',
		intro:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/RubyNew',
		tut_classes:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ClassesObjectsAndVariables',
		tut_containers:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ContainersBlocksAndIterators',
		tut_stdtypes:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/StandardTypes',
		tut_methods:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/MoreAboutMethods',
		tut_expressions:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Expressions',
		tut_exceptions:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ExceptionsCatchAndThrow',
		tut_modules:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Modules',
		tut_io:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/BasicInputAndOutput',
		tut_threads:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ThreadsAndProcesses',
		trouble:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/WhenTroubleStrikes',
		rubyworld:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/RubyAndItsWorld',
		web:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/RubyAndTheWeb',
		ext_tk:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/RubyTk',
		win32:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/RubyAndMicrosoftWindows',
		ext_ruby:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ExtendingRuby',
		language:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/TheRubyLanguage',
		classes:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ClassesAndObjects',
		taint:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/LockingRubyInTheSafe',
		ospace:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ReflectionObjectSpaceAndDistributedRuby',
		builtins:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/BuiltinClassesAndMethods',

		ref_c_array:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Array',
		ref_c_bignum:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Bignum',
		ref_c_binding:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Binding',
		ref_c_class:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Class',
		ref_c_continuation:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Continuation',
		ref_c_dir:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Dir',
		ref_c_exception:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Exception',
		ref_c_falseclass:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Falseclass',
		ref_c_file__stat:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/FileStat',
		ref_c_file:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/File',
		ref_c_fixnum:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Fixnum',
		ref_c_float:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Float',
		ref_c_hash:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Hash',
		ref_c_integer:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Integer',
		ref_c_io:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/IO',
		ref_c_matchdata:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/MatchData',
		ref_c_method:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Method',
		ref_c_module:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Module',
		ref_c_nilclass:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/NilClass',
		ref_c_numeric:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Numeric',
		ref_c_object:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Object',
		ref_c_proc:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Proc',
		ref_c_range:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Range',
		ref_c_regexp:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Regexp',
		ref_c_string:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/String',
		ref_c_struct__tms:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/StructTms',
		ref_c_struct:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Struct',
		ref_c_symbol:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Symbol',
		ref_c_thread:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Thread',
		ref_c_threadgroup:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ThreadGroup',
		ref_c_time:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Time',
		ref_c_trueclass:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Trueclass',
		ref_m_comparable:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Comparable',
		ref_m_enumerable:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Enumerable',
		ref_m_errno:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Errno',
		ref_m_filetest:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Filetest',
		ref_m_gc:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/GC',
		ref_m_kernel:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Kernel',
		ref_m_marshal:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Marshal',
		ref_m_math:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Math',
		ref_m_objectspace:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ObjectSpace',
		ref_m_process:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Process',

		lib_standard:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/StandardLibrary',
		lib_patterns:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/ObjectOrientedDesignLibraries',
		lib_network:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/NetworkAndWebLibraries',
		lib_windows:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/MicrosoftWindowsSupport',
		
		rdtool:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/EmbeddedDocumentation',
		irb:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/InteractiveRubyShell',
		support:'http://www.rubygarden.org/ruby?ProgrammingRubyTwo/Support'
	}

	if (!page){
		if (!evt && window.event) evt=window.event;
		if (!evt) return alert("ERROR! Can't find event object for Sync.");
		var a = evt.target || evt.currentTarget || evt.srcElement;
		if (!a) return alert("ERROR! Can't find the anchor to Sync.");
		var page = /([^\/.]+)\.(html|asp)/.exec(a.href)[1];
		var hash = (hash=/#.+/.exec(a.href))?hash[0]:null;
	}

	var syncURL = linkmap[page];
	if (!syncURL) return //alert("Cannot find the Wiki page associated with:\n"+a.href+"\n(I think the page is '"+page+"')");
	if (top.frames.wiki) top.frames.wiki.location.href = (syncURL || 'http://www.rubygarden.org/ruby?ProgrammingRubyTwo')+hash;
}

