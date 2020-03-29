var tczAppsui={};
var ready_callback=[];
var PZ=new function(){
this.ie=function(){var sVer=navigator.userAgent;if(sVer.indexOf("MSIE")==-1){return false}else{return true}};
this.s=function(obj,h){obj.scrollTop=h};
this.c=function(obj,n){obj.className=n};
this.d=function(did,t){if(!$(did))return;$(did).style.display=t};
this.v=function(did,en){if(!$(did))alert("不存在的输入框ID："+did);var v=$(did).value;if(en)v=PZ.en(v);return v};
/*---------------ajax post前转码---------------*/
this.en=function(str){
	if(str=="")return str;
	str=str.replace(/\+/g,"%2B");
	str=encodeURIComponent(str);	//escape(str);
	return str;
	};
/*---------------删除左右两端的空格 包括中文空格及英文空格---------------*/
this.trim=function(str){
	str=str.replace(/(^\s*)|(\s*$)/g, "");
	str=str.replace(/(^[\　]*)/g, "");
	str=str.replace(/([\　]*$)/g, "");
	return str;
	};
/*---------------小数---------------*/
this.xs=function(n,len){
	return n;
	};
/*---------------强制转为数字---------------*/
this.n=function(n){
	if(n=="")return 0;
	n=parseInt(n);
	//n=n.replace(/([^0-9]+)/g,"");
	return n;
	};
/*---------------指定长度随机数字---------------*/
this.n1=function(n){
	var sn=parseInt(Math.random().toString().slice(-n));
	if(sn.length!=n)sn+=1;
	return sn;
	};
/*---------------用于缓冲数字---------------*/
this.n2=function(n){
	if(n>0)n=Math.ceil(n);if(n<0)n=Math.floor(n);
	return n;
	};
/*---------------指定范围随机数字---------------*/
this.n3=function(n1,n2){return parseInt(Math.random()*(n2-n1+1)+n1)};
//保留多少位小数
this.formatFloat=function(src,pos){
	return Math.round(src*Math.pow(10,pos))/Math.pow(10,pos);
	};
/*---------------获取字符串长度 字节---------------*/
this.getlen=function(str){
	if(str=="")return 0;
	var len=0;
	for(var i=0;i<str.length;i++){
		if(str.charCodeAt(i)>127){len+=2}else{len++};
		};
	return len;
	};
/*---------------清除HTML标签---------------*/
this.clear=function(str){return str.replace(/<.*?>/g,"")};
/*---------------验证数据合法性---------------*/
this.regular=function(str,rtype){
	var sReg="",errs="";
	if(str=="")return "";
	switch(rtype){
		case "enint":sReg=/([a-zA-Z0-9]+)+$/;errs="字母或数字";break;
		case "enintxhx":sReg=/([a-zA-Z0-9_]+)+$/;errs="字母数字或下划线";break;
		case "txt2":str=str.replace("\r\n","");sReg=/([^'\"]+)+$/;errs="不能有单引号,双引号";break;
		case "txt":sReg=/([0-9\a-z\A-Z\u4E00-\u9FA5]+)+$/;errs="中文,数字或字母";break;
		case "int":sReg=/([0-9]+)+$/;errs="正整数";break;
		case "num":sReg=/([0-9\.]+)+$/;errs="整数或小数";break;
		case "allnum":sReg=/([0-9\.\-]+)+$/;errs="整数、小数、负数";break;
		case "en":sReg=/([a-zA-Z]+)+$/;errs="大小写字母";break;
		case "cn":sReg=/([\u4E00-\u9FA5]+)+$/;errs="中文汉字";break;
		case "email":sReg=/[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;errs="正确的邮箱地址";break;
		case "mobile":sReg=/1([0-9]{10})$/;errs="正确的手机号码";break;
		case "date":sReg=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;errs="日期，如 2011-10-08";break;
		case "time":sReg=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})( |\/)(\d{1,2})(:|\/)(\d{1,2})(:|\/)(\d{1,2})$/;errs="时间，如 1990-01-01 14:31:20";break;
		case "other":return "";break;
		};
	if(str.replace(sReg,"")!="")return "<span class=\"red\">"+qyklang.regular.error+"</span><br>"+errs;
	return "";
	};
this.infoint=function(args){
	var obj=args.obj || null;
	if(!obj)return;
	var min=args.min || 0;
	var max=args.max || 99999999;
	var ev=args.ev || "blur";
	obj.bind("focus",function(){
		$(this).select();
	}).bind(ev,function(){
		var n=$(this).val().replace(/([^0-9]+)/g,"");
		if(n=="")n=min;
		n=parseInt(n);
		if(n<min)n=min;
		if(n>max)n=max;
		$(this).val(n);
		});
	};
/*---------------loading---------------*/
this.load=function(args){
	var log=args.log || "open";
	var ico=args.ico || "ok";
	var msg=args.msg || "正在载入";
	switch(log){
		case "open":
			if($("#tcz_loading").length>0){
				$("#tcz_loading_tip").html(msg);
				$("#tcz_loading_text").show();
				$("#tcz_loading").show();
				if(ico=="no")$("#tcz_loading_ico").hide();
				else $("#tcz_loading_ico").show();
				var obj=$("#tcz_loading");
			}else{
				var html="<div class='ui_loading' id='tcz_loading'><div class=\"bg\"></div><div class=\"text\" id=\"tcz_loading_text\">";
				if(ico=="ok")html+="<img src=\""+tczAppsui.path+"images/b.gif\" id=\"tcz_loading_ico\">";
				html+="<span id=\"tcz_loading_tip\">"+msg+"</span></div></div>";
				var obj=$(html);
				$(document.body).append(obj);
				};
			//var l=($(window).width()-$("#tcz_loading_text").outerWidth())/2+$(document).scrollLeft();
			//var t=($(window).height()-$("#tcz_loading_text").outerHeight())/2+$(document).scrollTop();
			var l=($(window).width()-$("#tcz_loading_text").outerWidth())/2;
			var t=($(window).height()-$("#tcz_loading_text").outerHeight())/2;
			$("#tcz_loading_text").css({left:l+"px",top:t+"px"});
			obj.css({height:$(document).height()+"px",width:$(document).width()+"px"});
		break;
		case "close":
			$("#tcz_loading_text").fadeOut(500,function(){
				$("#tcz_loading").hide();
				});
		break;
		};
	};
/*---------------倒计时---------------*/
this.timeup=function(args){
	var endtime=args.endtime;
	var diff=args.diff;
	//endtime=new Date(endtime).getTime();	//取结束日期(毫秒值)
	var nowtime=new Date().getTime()/1000+diff;		//今天的日期(秒值)
	var seconds=Math.floor(endtime-nowtime);			//还有几秒
	var minutes=Math.floor(seconds/60);
	var hours=Math.floor(minutes/60);
	var days=Math.floor(hours/24);
	hours=hours%24;
	minutes=minutes%60;
	seconds=Math.floor(seconds%60);		//"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
	var res={status:0,days:days,hours:hours,minutes:minutes,seconds:seconds};
	if(endtime<=nowtime)res.status=1;
	return res;
	};
/*---------------数据输入框---------------*/
this.infonum=function(args){
	var log=args.log || "info";	//add,red,info 增加,减少,输入
	var inpid=args.inpid;
	var min=args.min || 0;
	var max=args.max || 99999999;
	var unit=args.unit || 1;	//增减单位
	var n=$("#"+inpid).val();
	switch(log){
		case "info":if(n=="")return;n=PZ.n(n);break;
		case "add":n=PZ.n(n);n+=unit;break;
		case "red":n=PZ.n(n);n-=unit;break;
		};
	if(n<min)n=min;else if(n>max)n=max;
	$("#"+inpid).val(n);
	if(args.callback)args.callback();
	};
/*---------------黑色背景提示，适用手机---------------*/
this.blacktip=function(args){
var log=args.log || "open";
var msg=args.msg || "请注意...";
var delay=args.delay || 2000;	//多少毫秒后关闭，1不关闭
var ico=args.ico || "alert";
switch(log){
	case "open":
		var cn=args.cn || PZ.n1(5);
		if($("#qyk_blacktip").length>0){
		$("#qyk_blacktip").stop().attr("cn",cn).fadeIn(500);
			$("#qyk_blacktip>.blackmsg").html(msg);
			if(delay>1){
				window.setTimeout("PZ.blacktip({log:'close',cn:'"+cn+"'})",delay);
				};
			if(args.callback)args.callback();
		}else{
			$(document.body).append("<div cn='"+cn+"' id='qyk_blacktip' class='ui_blacktip' style='display:none'><div class='blackmsg "+ico+"'>"+msg+"</div></div>");
			$("#qyk_blacktip").fadeIn(function(){
				if(delay>1){
					window.setTimeout("PZ.blacktip({log:'close',cn:'"+cn+"'})",delay);
					};
				if(args.callback)args.callback();
				});
			};
		return cn;
	break;
	case "close":
		var cn=args.cn || "";
		$("#qyk_blacktip[cn='"+cn+"']").fadeOut(function(){
			if(args.callback)args.callback();
			$("#qyk_blacktip").remove();
			});
	break;
	};
};
/*---------------飞行提示信息---------------*/
this.fly=function(args){
	var ico=args.ico || "alert";	//none,alert,error,success
	var delay=args.delay || 2000;	//多少毫秒后关闭
	var id=args.id || "fly_"+PZ.n1(8);
	var icoarr={"alert":"&#xe7bb;","error":"&#xe7b6;","success":"&#xe7da;","help":"&#xe65b;"};
	var boxw=480;	//pc端
	var boxl=($(window).width()-boxw)/2;	//pc端
	var boxy=$(window).height()*0.15;
	if(tczAppsui.mobile){
		boxw=$(window).width()-20;
		boxl=0;
		boxy=0;
		};
	if($("#qyk_flybox").length==0)$(document.body).append("<div id='qyk_flybox' class='ui_fly' style='width:"+boxw+"px;left:"+boxl+"px;top:"+boxy+"px'></div>");
	var html="<div id='"+id+"' class='fly_msg fly_"+ico+"' style='display:none'>"+
	"<div class='fly_line' style='width:100%;display:none'></div>"+
	"<a class='fly_body' href='javascript:'><span class='qykicon'>"+icoarr[ico]+"</span>"+args.msg+"</a>"+
	"<a class='fly_close' href='javascript:'><span class='qykicon'>&#xe605;</span></a>"+
	"</div>";
	$("#qyk_flybox").append(html);
	var msgh=$("#"+id).outerHeight();
	var msgy=10;
	var func=function(){
		if(args.link)$("#"+id+">.fly_body").click(function(){
			location.href=args.link;
			});
		var closefunc=function(){
			if($("#"+id+">.fly_line").length==0)return;
			$("#"+id+">.fly_line").remove();
			$("#"+id).animate({opacity:"0",top:(msgy-msgh)+"px"},300,function(){
				$("#"+id).slideUp(300,function(){
					$("#"+id).remove();
					if($("#qyk_flybox>.fly_msg").length==0)$("#qyk_flybox").remove();
					});
				if(args.callback)args.callback();
				});
			};
		$("#"+id+">.fly_line").show().animate({width:"0px"},delay,closefunc);
		$("#"+id+">.fly_close").click(closefunc);
		};
	$("#"+id).css({top:(msgy-msgh)+"px"}).animate({opacity:"show",top:msgy+"px"},300,func);
	return id;
	};
/*---------------模拟警告框---------------*/
this.e=function(args){
	var ico=args.ico || "alert";	//none,alert,error,success
	var title=args.title || qyklang.win.title;
	var close=args.close || "none";
	var btn=args.btn || [{text:qyklang.win.btn_ok,close:"ok"}];
	//var animate=args.animate || 1;	//动画样式 0不启用 1-3
	var animate=1;
	if(tczAppsui.win_animate)animate=tczAppsui.win_animate;
	if(args.animate)animate=args.animate;	//动画样式 0不启用 1-3
	var icoarr={"alert":"&#xe7bb;","error":"&#xe7b6;","success":"&#xe7da;","help":"&#xe65b;"};
	var html="<div class='win_info_alert'>";
	if(ico!="none")html+="<div class=\"ico\"><span class=\"qykicon "+ico+"\">"+icoarr[ico]+"</span></div>";
	html+="<div class=\"text\">"+args.msg+"</div></div>";
	var id=PZ.win({title:title,animate:animate,close:close,type:"html",content:html,btn:btn});
	};
/*---------------模拟窗口---------------*/
this.win=function(args){
	var log=args.log || "open";		//操作方式
	var id=args.id || "win_"+PZ.n1(8);
	var title=args.title || "";
	var content=args.content || "";
	var type=args.type || "html";
	var close=args.close || "ok";	//是否有关闭按钮
	var shadow=args.shadow || 1;	//阴影样式
	var animate=1;
	if(tczAppsui.win_animate)animate=tczAppsui.win_animate;
	if(args.animate)animate=args.animate;	//动画样式 0不启用 1-3
	//var callback=args.callback;
	var w=args.w || 0;		//默认窗口宽 0为自动 iframe载入方式必须指定
	var h=args.h || 0;		//默认窗口高 0为自动
	switch(log){
		case "change":	//改变大小及位置
			var x=args.x || 0;
			var y=args.y || 0;
			$("#"+id+"_info").css({width:"auto",height:"auto"});
			if(w==0){w=$("#"+id+"_info").width()};
			if(h==0){h=$("#"+id+"_info").height()};
			if(w<180)w=180;if(h<80)h=80;
			var x=($(window).width()-w)/2;
			var y=($(window).height()-h)/2;
			if(x<0)x=0;if(y<0)y=0;
			$("#"+id+"_info").css({width:w+"px",height:h+"px"});
			if(animate==99){
				$("#"+id).css({left:x+"px",top:y+"px",width:w+"px",height:h+"px"});
				if(args.callback)args.callback();
			}else{
				$("#"+id+"_close").hide();
				$("#"+id).animate({left:x+"px",top:y+"px",width:w+"px",height:h+"px"},200,function(){
					if(close=="ok")$("#"+id+"_close").show();
					if(args.callback)args.callback();
					});
				};
			return;
		break;
		case "close":
			if($("#"+id).length==0){
				if(args.callback)args.callback();
				return;
				}
			var func=function(){
				$("#"+id).remove();
				if($(".win_block").length==0)$("#tcz_window").remove();
				else{
					var cc=PZ.n($("#tcz_window>div:last").css("z-index"));
					$("#tcz_window_bg").css({zIndex:cc});
					};
				if(args.callback)args.callback();
				};
			//$("#"+id+"_close").hide();
			switch(animate){
				case 0:
				case 99:
					func();
				break;
				case 1:	//淡出
					var t=($(window).height()-$("#"+id).outerHeight())/2-30;
					$("#"+id).animate({top:t+"px",opacity:0},300,func);
				break;
				case 2:	//从下到上擦除
					$("#"+id).slideUp(200,func);
				break;
				case 3:	//从大变小
					var t=($(window).height()-2)/2;
					var l=($(window).width()-2)/2;
					$("#"+id).animate({top:t+"px",left:l+"px",width:"2px",height:"2px",opacity:0.1},200,func);
				break;
				};
			return;
		break;
		};
	if($("#"+id).length>0)return;//如果相同ID的窗口存在则不再创建
	if($("#tcz_window").length==0){
		var objdiv=$("<div class='ui_window' id='tcz_window' style='height:"+$(document).height()+"px'></div>");
		$(document.body).append(objdiv);
		};
	var cc=1;
	if($("#tcz_window>div:last").length>0)cc=PZ.n($("#tcz_window>div:last").css("z-index"))+1;
	if($("#tcz_window_bg").length==0){
		var objdiv2=$("<div class='win_bg' style='z-index:"+cc+"' id='tcz_window_bg'></div>");
		$("#tcz_window").append(objdiv2);
	}else{
		$("#tcz_window_bg").css({zIndex:cc});
		};
	var html="<div class='win_block' id='"+id+"' style='z-index:"+cc+"'>";
	if(close=="ok")html+="<a class='win_close' id='"+id+"_close' href='javascript:'>×</a>";
	//html+="<div class='win_shadow"+shadow+"' id='"+id+"_shadow'></div>";
	html+="<div class='win_info' id='"+id+"_info'>";
	if(title!=""&&title!="none")html+="<div class='win_info_title'>"+title+"</div>";
	html+=content+"</div>";
	var objdiv3=$(html);
	$("#tcz_window").append(objdiv3);
	if(close=="ok"){
		$("#"+id+"_close").click(function(){
			if(args.closeback)PZ.win({log:"close",id:id,animate:animate,callback:args.closeback});
			else PZ.win({log:"close",id:id,animate:animate});
			});
		};
	if(args.btn){
		var btnlen=args.btn.length;
		btnhtml="<div class='win_info_btn' id='"+id+"_btn'></div>";
		$("#"+id+"_info").append(btnhtml);
		for(var i=0;i<btnlen;i++){
			(function(){
				var btn=args.btn[i];
				var css=btn.css || "default";
				//if(css==""){
					//if(args.btn.length==1)css="light";else css="default";
					//};
				var btnclose=btn.close || "ok";
				btnhtml="<a href=\"javascript:\" id=\""+id+"_btn_"+i+"\" class=\""+css+"\" style=\"width:"+(100/btnlen)+"%\">"+btn.text+"</a>";
				$("#"+id+"_btn").append(btnhtml);
				$("#"+id+"_btn_"+i).click(function(){
					if(btn.callback)btn.callback();
					if(btn.close=="ok")PZ.win({log:"close",id:id,animate:animate});
					});
				})();
			};
		};
	if(w==0){w=$("#"+id+"_info").outerWidth()};
	if(h==0){h=$("#"+id+"_info").height()};
	if(w<180)w=180;if(h<80)h=80;
	//alert(w);
	var l=($(window).width()-w)/2;
	var t=($(window).height()-h)/2;
	if(l<0)l=0;if(t<0)t=0;
	$("#"+id+"_info").css({width:w+"px",height:h+"px"});
	if(animate!=3)$("#"+id).css({left:l+"px",top:t+"px",width:w+"px",height:h+"px"});
	var func=function(){
		if(args.callback)args.callback();
		};
	switch(animate){
		case 0:
		case 99:
			func();
		break;
		case 1:	//淡入
			//$("#"+id+"_info").hide();
			//$("#"+id+"_info").fadeIn(200,func);
			$("#"+id).css({top:(t-30),opacity:0});
			$("#"+id).animate({top:t+"px",opacity:1},300,func);
		break;
		case 2:	//从上到下擦除
			$("#"+id).hide();
			$("#"+id).slideDown(200,func);
		break;
		case 3:	//由小变大
			//$("#"+id).hide();
			var t2=($(window).height()-2)/2;
			var l2=($(window).width()-2)/2;
			$("#"+id).css({left:l2+"px",top:t2+"px",width:"2px",height:"2px"});
			$("#"+id).animate({top:t+"px",left:l+"px",width:w+"px",height:h+"px"},200,func);
		break;
		};
	return id;
	};
/*---------------选项卡---------------*/
this.cata=function(args){
	var did=args.did;
	var btn=$("#tcz_catalist > .catalist > .left > a");
	var con=$("#tcz_catalist > .catadesc");
	btn.click(function(){
		var xu=$(this).index();
		btn.each(function(){
			if($(this).index()==xu)$(this).removeClass().addClass("on");
			else $(this).removeClass().addClass("out");
			});
		con.each(function(){
			if($(this).index()==xu+1){
				$(this).css({display:""});
				if(args.callback)args.callback($(this),xu);
			}else $(this).css({display:"none"});
			});
		});
	};
/*---------------提示信息---------------*/
this.tip=function(args){
	var msg=args.msg;
	var obj=args.obj;
	var delay=args.delay || 5000;
	var log=args.log || "open";
	var id=args.id || "tip_"+PZ.n1(8);
	switch(log){
		case "open":
			var upclose=args.upclose || "no";
			if($("#"+id).length>0)$("#"+id).remove();
			var tip=$("<div class='ui_tip' id='"+id+"'><div class='arrow'></div>"+msg+"</div>");
			$(document.body).append(tip);
			var w=tip.width();
			var h=tip.innerHeight();
			if(w<80)w=80;if(h<20)h=20;
			var pos=obj.offset();
			var x=pos.left;
			var y=pos.top-h-9;
			var st=$(document).scrollTop();
			if(x<0)x=0;if(y<0)y=0;
			if(st>y)window.scrollTo(0,y);
			tip.css({left:x+"px",top:y+"px",width:w+"px",display:"none"});
			var closefunc=function(){
				if(tip.length>0){
					if(upclose=="ok")$(document.body).unbind("click",closefunc);
					tip.fadeOut(200,function(){
						if(tip.length>0)tip.remove();
						});
					};
				};
			tip.fadeIn(200,function(){
				if(delay>0)window.setTimeout(closefunc,delay);
				if(upclose=="ok")$(document.body).bind("click",closefunc);
				});
			//return id;
		break;
		case "close":
			$("#"+id).fadeOut(200,function(){$("#"+id).remove()});
		break;
		case "addover":
			obj.bind("mouseover",function(){
				PZ.tip({log:"open",obj:obj,id:id,msg:msg,delay:10000});
				});
			obj.bind("mouseleave",function(){
				PZ.tip({log:"close",id:id});
				});
		break;
		case "addfocus":
			obj.bind("focus",function(){
				PZ.tip({log:"open",obj:obj,id:id,msg:msg,delay:30000});
				});
			obj.bind("blur",function(){
				PZ.tip({log:"close",id:id});
				});
		break;
		case "addone":
			var focus=args.focus || obj;
			focus.one("blur",function(){
				PZ.tip({log:"close",id:id});
				});
			if(delay == 5000) delay=30000
			PZ.tip({log:"open",obj:obj,id:id,msg:msg,delay:delay});
			focus.focus();
		break;
		};
	};
/*---------------密码输入框---------------*/
this.passinp=function(args){
	var id=args.id;
	var css=$("#"+id).attr("class");
	$("#"+id).val("请输入密码").attr('readonly',true).css({color:"#999",background:"#e8e8e8"});
	var func=function(){
		if($("#"+id).length==0)return;
		if($("#"+id).attr("type")!="text")return;
		$("#"+id).unbind().replaceWith("<input type='password' id='"+id+"' class='"+css+"' onfocus='this.select()'>");
		$("#"+id).focus();
		};
	$("#"+id).bind("click",func);
	window.setTimeout(func,3000);
	};
/*---------------模拟下拉菜单---------------*/
this.select=function(args){
	var log=args.log || "create";
	var sid=args.sid;
	//var id=args.id || "sel_"+PZ.n1(8);
	var id=sid+"_select";
	var w=args.w || 0;
	var child=args.child || [];
	var parent=args.parent || "";
	switch(log){
		case "create":
			if($("#"+sid).length==0)return;
			if(w==0)w=$("#"+sid).outerWidth()-2;
			var def=args.def || "";
			$("#"+sid).hide();
			var text=$("#"+sid+" option:selected").text();
			if(text=="")text=def;
			var ml=parseInt($("#"+sid).css("marginLeft"));
			var mr=parseInt($("#"+sid).css("marginRight"));
			var ss="width:"+w+"px;"+(ml>0?"margin-left:"+ml+"px;":"")+(mr>0?"margin-right:"+mr+"px;":"");
			var sel="<div class='ui_select' id='"+id+"' style='"+ss+"' dis='no'><div class='sel_out' id='"+id+"_out' style='width:"+(w-2)+"px'><div id='"+id+"_info' class='sel_info' style='width:"+(w-40)+"px'>"+text+"</div><div class='sel_arrow'></div></div></div>";
			$("#"+sid).before(sel);
			$("#"+id).mouseover(function(){
				if($("#"+id+"_out").attr("class")=="sel_out"){
					$("#"+id+"_out").removeClass().addClass("sel_on");
					};
				});
			$("#"+id).mouseout(function(){
				if($("#"+id+"_out").attr("class")=="sel_on"){
					$("#"+id+"_out").removeClass().addClass("sel_out");
					};
				});
			if($("#"+sid).attr("disabled")){
				PZ.select({sid:sid,log:"disabled"});
				};
			$("#"+id).click(function(){
				if($("#"+id+"_out").attr("class")=="sel_dis")return;
				if($("#"+id+"_opt").length==0){
					var val=$("#"+sid+" option:selected").val();
					$("#"+id+"_out").removeClass().addClass("sel_down");
					var optlink="";
					if(args.types){
						optlink="<div class='loadsel'><img src='"+tczAppsui.path+"images/ui/loading_s.gif'>请稍候...</div>";
					}else{
						var optlen=$("#"+sid+" option").length;
						for(var i=0;i<optlen;i++){
							var css=$("#"+sid+" option")[i].value==val?"on":"out";
							var _text=$("#"+sid+" option")[i].text;
							//if(optlen==1&&_text=="")_text=def;
							optlink+="<a class='"+css+"' href='javascript:' onmouseup=\"PZ.select({log:'check',sid:'"+sid+"',val:'"+$("#"+sid+" option")[i].value+"'})\">"+_text+"</a>";
							};
						};
					var pos=$("#"+id).offset();
					var x=pos.left;
					var y=pos.top+$("#"+id).outerHeight();
					var optdiv=$("<div class='ui_select_opt' id='"+id+"_opt' style='width:"+(w-4)+"px;left:"+x+"px;top:"+y+"px'>"+optlink+"</div>");
					$(document.body).append(optdiv);
					//optdiv.hide();
					if(args.types){
						var bval="";
						if(parent!=""){
							bval=$("#"+parent).val();
							if(bval==""||bval==null||bval==0){
								PZ.tip({obj:$("#"+parent+"_select"),msg:"请先选择该项再选择下一级菜单",delay:1500});
								PZ.select({log:"del",sid:sid});
								return;
								};
							};
						//alert("顶层"+bval)
						$.ajax({
							type:"GET",
							url:"/?log=post&desc=select&bval="+PZ.en(bval)+"&types="+args.types,
							cache:false,
							dataType:"json",
							success:function(res){
								eval("var data="+res.data);
								var datalen=data.length;
								optlink="";
								if(datalen==0){
									optlink+="<a class='on' href='#' onmouseup=\"PZ.select({log:'check',sid:'"+sid+"',val:'',text:'"+def+"'})\" onclick=\"return false\">暂无选项</a>";
								}else{
									for(var i=0;i<datalen;i++){
										var css=data[i].val==val?"on":"out";
										optlink+="<a class='"+css+"' href='#' onmouseup=\"PZ.select({log:'check',sid:'"+sid+"',text:'"+data[i].text+"',val:'"+data[i].val+"'})\" onclick=\"return false\">"+data[i].text+"</a>";
										};
									};
								optdiv.html(optlink);
								PZ.select({log:"resel",sid:sid});
								}
							});
						}else PZ.select({log:"resel",sid:sid});
						$(document.body).bind("mouseup", function(event){
							//alert(event.tagName)
							PZ.select({log:"del",sid:sid});
							});
					//alert("add")
					};
				});
		break;
		case "resel":
			var h=$("#"+sid+"_select_opt").height();
			if(h>300)$("#"+sid+"_select_opt").css({height:"300px",overflow:"auto",overflowX:"hidden"});
		break;
		case "check":
			var val_old=$("#"+sid).val() || "";
			var val=args.val;
			if(val_old==val)return;
			//$("#"+sid).show();
			try{
				$("#"+sid).val(val);
				$("#"+sid).change();
			}catch(e){};
			var text=args.text || "";
			//alert(text)
			if(text=="")text=$("#"+sid+" option:selected").text();
			if(text!=$("#"+sid+" option:selected").text()){
				$("#"+sid).append("<option value='"+val+"' selected>"+text+"</option>");
				};
			//$("#"+sid).hide();
			$("#"+id+"_info").html(text);
			PZ.select({log:"del",sid:sid});
			if($("select[parent='"+sid+"']").length>0){
				$("select[parent='"+sid+"']").each(function(){
					var pid=$(this).attr("id") || null;
					if(pid)PZ.select({log:'check',sid:pid,val:""});
					});
				};
		break;
		case "disabled":
			var type=args.type || true;
			if(type)$("#"+id+"_out").removeClass().addClass("sel_dis");
			else $("#"+id+"_out").removeClass().addClass("sel_out");
		break;
		case "del":
			$(document.body).unbind("mouseup");
			$("#"+id+"_out").removeClass().addClass("sel_out");
			$("#"+id+"_opt").fadeOut(200,function(){
				$("#"+id+"_opt").remove();
				});
		break;
		};
	};
/*---------------图片浏览器---------------*/
this.photobox=function(args){
	var css=args.css || ""
	var qykphoto=args.qykphoto || "";
	var arr;
	if(css!="")arr=$("."+css);
	else if(qykphoto!="")arr=$("[qykphoto='qyk_photobox']");
	//alert(arr.length)
	var xu=args.xu || 0;
	var len=arr.length;
	if(len==0)return;
	var func=function(myxu){
		PZ.load({log:"open"});
		var obj=$(arr[myxu-1]);
		if(obj.is("img")){
			var url=arr[myxu-1].src;
			var big=obj.attr("big");
			if(big!=""&&typeof(big)!="undefined")url=big;
			var title=arr[myxu-1].alt;
		}else{
			var url=arr[myxu-1].href;
			var title=arr[myxu-1].title;
			};
		var xu_pre=myxu-1<1?len:myxu-1;
		var xu_next=myxu+1>len?1:myxu+1;
		var mw=$(window).width();
		var mh=$(window).height();
		var img=new Image();
		img.onload=function(){
			PZ.load({log:"close"});
			var w=img.width;var h=img.height;
			if(w>mw){w=mw;h=w/img.width*img.height};
			if(h>mh){h=mh;w=h/img.height*img.width};
			if($("#tcz_photobox").length==0){
				var objdiv="<div class='ui_photobox' id='tcz_photobox'>"+
				"<div class=\"box_img\"><img src=\""+tczAppsui.path+"images/b.gif\" style=\"width:2px;height:2px;left:"+(mw-2)/2+"px;top:"+(mh-2)/2+"px\"></div>"+
				//"<div class=\"box_foot\" style=\"display:none\"><div class=\"box_tit\">&nbsp;</div><div class=\"box_xu\">0 / 0</div></div>"+
				"<a class=\"box_pre\" href=\"javascript:\">&nbsp;</a>"+
				"<a class=\"box_next\" href=\"javascript:\">&nbsp;</a>"+
				"<a class=\"box_close\" href=\"javascript:\"><span class=\"qykicon\">&#xe605;</span></a>"+
				"</div>";
				$(document.body).append($(objdiv));
				$("#tcz_photobox>.box_close").click(function(){
					$("#tcz_photobox").fadeOut(200,function(){
						$(this).remove();
						});
					});
				};
			var imgl=(mw-w)/2;
			var imgt=(mh-h)/2;
			$("#tcz_photobox>.box_img>img").hide().attr("src",url).animate({
				opacity:"toggle",width:w,height:h,left:imgl,top:imgt},200,function(){
					
				});
			/*
			$("#tcz_photobox>.box_img").hide().html("<img width=\""+w+"\" height=\""+h+"\" src=\""+url+"\" style=\"left:"+imgl+"px;top:"+imgt+"px\">").animate(200,function(){
				$("#tcz_photobox>.box_img").fadeIn(400,function(){
					$("#tcz_photobox>.box_foot").slideDown(200);
					});
				});
			*/
			if(len>1){
				$("#tcz_photobox>.box_pre").bind("click",function(){
					$(this).unbind("click");
					$("#tcz_photobox>.box_next").unbind("click");
					PZ.photobox({css:css,qykphoto:qykphoto,xu:xu_pre});
					});
				$("#tcz_photobox>.box_next").bind("click",function(){
					$(this).unbind("click");
					$("#tcz_photobox>.box_pre").unbind("click");
					PZ.photobox({css:css,qykphoto:qykphoto,xu:xu_next});
					});
			}else{
				$("#tcz_photobox>.box_pre").hide();
				$("#tcz_photobox>.box_next").hide();
				//$("#tcz_photobox>.box_close").hide();
				};
			};
		img.src=url;
		};
	if(xu>0){func(xu);return};
	arr.each(function(){
		if($(this).is("img")&&$(this).parent().is("a")){
			
		}else{
			$(this).click(function(){
				var myxu=arr.index(this)+1;
				func(myxu);
				return false;
				});
			};
		});
	};
/*---------------链接新窗打开---------------*/
this.openlink=function(obj){
	$(obj).attr("target","_blank");
	return true;
	};
/*---------------显示时间---------------*/
this.viewtime=function(args){
	var obj=args.obj;
	var func=function(){
		var d=new Date(),str="";
		str+=d.getFullYear()+"年";
		str+=d.getMonth()+1+"月";
		str+=d.getDate()+"日 ";
		str+=d.getHours()+"时";
		str+=d.getMinutes()+"分";
		str+=d.getSeconds()+"秒";
		obj.html(str);
		window.setTimeout(func,1000);
		};
	func();
	};
/*---------------获取URL---------------*/
this.getlink=function($url){
	return '/api.php?/'+$url;
	};
/*---------------弹出留言界面---------------*/
this.openfeedback=function(){
	var html="<div class=\"ui_feedback\">"+
		"<div class=\"list\"><span class=\"cname\">"+qyklang.feedback.open.name+"：</span><span class=\"inp\"><input type=\"text\" id=\"post_name\"></span><span class=\"tips\"><b class='red'>*</b></span></div>"+
		"<div class=\"list\"><span class=\"cname\">"+qyklang.feedback.open.email+"：</span><span class=\"inp\"><input type=\"text\" id=\"post_email\"></span><span class=\"tips\"><b class='red'>*</b> "+qyklang.feedback.open.email_tip+"</span></div>"+
		"<div class=\"list\"><span class=\"cname\">"+qyklang.feedback.open.tel+"：</span><span class=\"inp\"><input type=\"text\" id=\"post_phone\"></span></div>"+
		"<div class=\"list\"><span class=\"cname\">"+qyklang.feedback.open.upload+"：</span><span class=\"inp\"><input type='hidden' id='post_attachment'><a href='javascript:' class='upload' id='post_upfile_out'></a></span><span class=\"tips\"><b>*</b> "+qyklang.feedback.open.upload_tip+"</span></div>"+
		"<div class=\"list\" style=\"height:170px\"><span class=\"cname\">"+qyklang.feedback.open.content+"：</span><span class=\"inp2\"><textarea id=\"post_content\"></textarea></span></div>"+
		//"<div class=\"list\" style=\"height:170px\"><span class=\"cname\">"+qyklang.feedback.open.content+"：</span><span class=\"inp2\"><div class='infotext' contentEditable=true id='post_content'></div></span></div>"+
		"</div>";
	var wfid=PZ.win({id:"win_feedback",title:qyklang.feedback.open.title,content:html,btn:[
		{text:qyklang.feedback.open.btn1,callback:function(){
			PZ.sendfeedback();
			}},
		{text:qyklang.feedback.open.btn2,close:"ok"}
		],callback:function(){
			$("#post_name").focus();
			var uphtml="<form action='/api.php?log=feedback_upload' id='post_feedback_form' name='post_feedback_form' encType='multipart/form-data' method='post' target='hidden_frame'><input type='hidden' name='log' value='feedback_upload'><span id='post_upfile_text'>"+qyklang.feedback.open.upload_start+"</span><input type='file' name='file' id='post_upfile'><iframe name='hidden_frame' id='hidden_frame' style='display:none'></iframe>";
			$("#post_upfile_out").html(uphtml);
			$("#post_upfile_text").bind("click",function(){
				$("#post_upfile_out").html(uphtml);
				});
			$("#post_upfile").bind("change",function(){
				var file=$("#post_upfile").val();
				if(file!=""){
					var args=file.split(".");
					var ftype=args[args.length-1].toLowerCase();
					if("|gif|png|jpg|rar|zip|doc|".indexOf("|"+ftype+"|")==-1){
						PZ.tip({obj:$("#post_upfile_out"),msg:qyklang.feedback.open.upload_tip,upclose:"ok"});
						$("#post_upfile_out").html(uphtml);
					}else{
						$("#post_upfile_text").css({"color":"#ff0"}).html(qyklang.feedback.open.upload_cancel);
						$("#post_upfile").hide();
						};
				}else{
					$("#post_upfile_text").css({'color':""}).html(qyklang.feedback.open.upload_start);
					};
				});
			}});
	};
/*---------------提交留言---------------*/
this.sendfeedback_upload=function(args){
	var log=args.log || "success";
	switch(log){
		case "success":
			$("#post_attachment").val(args.file);
			PZ.sendfeedback();
		break;
		case "error":
			PZ.load({log:"close"});
			PZ.e({msg:args.msg});
		break;
		};
	};
this.sendfeedback=function(){
	var args=arguments[0] || {};
	var name=PZ.trim($("#post_name").val());
	var email=PZ.trim($("#post_email").val());
	var phone=PZ.trim($("#post_phone").val());
	var content=PZ.trim($("#post_content").val());
	if(name==""){PZ.tip({log:"addone",obj:$("#post_name"),msg:qyklang.feedback.send.name});return;};
	if(email==""&&phone==""){PZ.tip({log:"addone",obj:$("#post_phone"),msg:qyklang.feedback.send.email});return;};
	if(content==""){PZ.tip({log:"addone",obj:$("#post_content"),msg:qyklang.feedback.send.content});return;};
	var data="lang="+tczAppsui.lang+"&name="+PZ.en(name)+"&email="+PZ.en(email)+"&phone="+PZ.en(phone)+"&content="+PZ.en(content);
	PZ.load({log:"open",msg:qyklang.feedback.send.load});
	var attachment=$("#post_attachment").val();
	if($("#post_upfile").length>0){
		if($("#post_attachment").val()==""&&$("#post_upfile").val()!=""){
			$("#post_feedback_form").submit();
			return;
			};
		data+="&attachment="+PZ.en(attachment);
		};
	$.ajax({
		type:"POST",
		url:"/?log=post&desc=feedback",
		data:data,
		cache:false,
		dataType:"json",
		success:function(res){
			PZ.load({log:"close"});
			//alert(res);return;
			switch(res.status){
				case 0:
					if(args.success)args.success();
					else{
						if($("#win_feedback").length>0)PZ.win({log:"close",id:"win_feedback"});
						PZ.e({ico:"success",close:"no",msg:qyklang.feedback.send.success,btn:[
							{text:qyklang.feedback.send.btn,callback:function(){
								PZ.reload();
								}}
							]});
						};
				break;
				default:PZ.e({ico:"error",msg:res.data});break;
				};
			}
		});
	};
/*---------------工具栏---------------*/
this.tool=function(args){
	if(!tczAppsui.tool)return;
	var top=args.top || 150;
	var html="<div class='ui_sidetool' id='tcz_sidetool'><div class='con' style='display:none'><div class='arrow'></div><div class='desc'></div></div><div class='win'>";
		if(tczAppsui.tool_customer!="")html+="<a tag='customer' href='javascript:' class='out' title='"+qyklang.tool.customer+"'><div class='bg'></div><div class='ico qq'></div></a>";
		if(tczAppsui.tool_skype!="")html+="<a tag='skype' href='javascript:' class='out' title='"+qyklang.tool.skype+"'><div class='bg'></div><div class='ico skype'></div></a>";
		if(tczAppsui.tool_phone!="")html+="<a tag='phone' href='javascript:' class='out' title='"+qyklang.tool.phone+"'><div class='bg'></div><div class='ico contact'></div></a>";
		if(tczAppsui.tool_weixin!="")html+="<a tag='weixin' href='javascript:' class='out' title='"+qyklang.tool.weixin+"'><div class='bg'></div><div class='ico weixin'></div></a>";
		if(tczAppsui.tool_feedback)html+="<a tag='feedback' href='javascript:' class='out' title='"+qyklang.tool.feedback+"'><div class='bg'></div><div class='ico feedback'></div></a>";
		html+="<a tag='close' href='javascript:' class='out' onclick=\"$('#tcz_sidetool').remove()\" title='"+qyklang.tool.close+"'><div class='bg'></div><div class='ico close'></div></a>";
		html+="</div></div>";
	$("body").append($(html));
	var st=$(document).scrollTop()+top;
	$("#tcz_sidetool").css({top:st+"px"});
	var timer;
	$("#tcz_sidetool>.win>a").click(function(){
		var tag=$(this).attr("tag");
		if(tag=="feedback"){
			PZ.openfeedback();
			return;
			};
		eval("var cont=tczAppsui.tool_"+tag);
		$('#tcz_sidetool>.con>.desc').html(cont);
		var pos=$(this).position();
		var y=pos.top;
		if($('#tcz_sidetool>.con').is(":hidden")){
			$('#tcz_sidetool>.con').css({top:y+"px"}).fadeIn(200);
		}else{
			$('#tcz_sidetool>.con').animate({top:y+"px"},100);
			};
		});
	$('#tcz_sidetool').mouseleave(function(){
		timer=window.setTimeout(function(){
			$("#tcz_sidetool>.con").fadeOut(500);
			},500)
		});
	$('#tcz_sidetool').mouseover(function(){
		window.clearTimeout(timer);
		});
	$(window).bind("scroll",function(){
		var qqfunc=function(){
			if($("#tcz_sidetool").length>0){
				var st=$(document).scrollTop()+top;
				$("#tcz_sidetool").animate({top:st});
				};
			};
		window.clearTimeout(timer);
		timer=window.setTimeout(qqfunc,100);
		});
	};
/*---------------banner---------------*/
this.banner=function(args){
	var obj=args.obj;
	var btn=args.btn || "dot";	//close表示关闭
	var pos=args.pos || "center";
	var animate=args.animate || 5;	//0随机 1无动画
	var order=args.order || 1;	//1正常 2随机
	var target=args.target || "";	//链接打开方式
	var item=obj.find("a");
	var len=item.length;
	if(len==0){
		var w=obj.width();
		if(w==$(window).width())w=1920;
		var h=obj.height();
		obj.html("<p style='padding:10px'>"+qyklang.banner.nodata+w+"x"+h+"</p>");
		return;
		};
	var delay=args.delay || 5000;
	var but="";
	var i=0;
	var list=[];
	var on=1;
	var timer;
	item.each(function(){
		var css=i==0?"on":"out";
		var text=$(this).attr("title");
		var link=$(this).attr("href");
		var img=$(this).find("img:first").attr("src");
		var other=$(this).attr("other");
		list.push({text:text,link:link,img:img,other:other});
		but+="<div xu='"+i+"' class='"+css+"' onclick=\""+(target=="new"?"window.open('"+link+"')":"location.href='"+link+"'")+"\"><span>"+(i+1)+"</span></div>";
		i++;
		});
	var html="<div class='banner'><span style=\"background-image:url('"+list[0].img+"')\"></span></div>"
		+"<div class='click' style=\"background:url('"+tczAppsui.path+"images/b.gif')\"></div>"
		+"<div class='picbtn_"+btn+"'><div class='btnscro'>"+but+"</div></div>";
	obj.html(html);
	var b1=obj.find(".btnscro>div:eq(0)");
	var ow=b1.outerWidth()+parseInt(b1.css("marginLeft"))+parseInt(b1.css("marginRight"));
	ow=ow*len;
	switch(pos){
		case "center":
			obj.find(".picbtn_"+btn).css({width:ow+"px",left:"50%",marginLeft:-(ow/2)+"px"});
		break;
		case "left":
			obj.find(".picbtn_"+btn).css({width:ow+"px",left:"10px",right:"auto"});
		break;
		case "right":
			obj.find(".picbtn_"+btn).css({left:"auto",width:ow+"px",right:"10px"});
		break;
		};
	var ck=obj.find(".click");
	ck.mouseover(function(){
		window.clearTimeout(timer);
	}).mouseleave(function(){
		timer=window.setTimeout(start,delay);
	}).click(function(){
		//obj.find(".btnscro>.on").trigger("click");
	}).bind("touchstart mousedown",function(e){
		var e=e||event;
		var x=e.clientX || e.pageX;
		if(e.originalEvent.targetTouches)x=e.originalEvent.targetTouches[0].pageX;
		//$(window).bind("touchmove mousemove touchcancel mouseup",function(){});
		$(window).bind("touchend touchcancel mouseup",function(e2){
			var e2=e2||event;
			var x2=e2.clientX || e2.pageX;
			if(e.originalEvent.targetTouches)x2=e.originalEvent.targetTouches[0].pageX;
			if(isNaN(x)||isNaN(x2))return;
			$(window).unbind("touchend touchcancel mouseup");
			if(x2-x>50){	//上一张
				on-=2;
				if(on<0)on=len-1;
				start();
			}else if(x-x2>50){	//下一张
				start();
			}else{
				obj.find(".btnscro>.on").trigger("click");
				};
			});
		});
	obj.find(".btnscro>div").mouseover(function(){
		window.clearTimeout(timer);
		var xu=PZ.n($(this).attr("xu"));
		on=xu;
		start();
		});
	var start=function(){
		if(len<=1)return;
		window.clearTimeout(timer);
		var ban=obj.find(".banner>span:eq(0)");
		obj.find(".btnscro>.on").removeClass("on").addClass("out");
		obj.find(".btnscro>div:eq("+on+")").removeClass("out").addClass("on");
		var ani=animate;
		if(animate==0)ani=PZ.n3(2,8);
		switch(ani){
			case 2: //渐显
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>").fadeOut(500,function(){
					ban.remove();
					});
			break;
			case 3:	//左到右
				var aw=obj.outerWidth();
				ban.before("<span style=\"background-image:url('"+list[on].img+"');left:-"+aw+"px\"></span>");
				ban.animate({left:aw},200,function(){ban.remove()});
				obj.find(".banner>span:eq(0)").animate({left:0},300);
			break;
			case 4:	//右到左
				var aw=obj.outerWidth();
				ban.before("<span style=\"background-image:url('"+list[on].img+"');left:"+aw+"px\"></span>");
				ban.animate({left:-aw},200,function(){ban.remove()});
				obj.find(".banner>span:eq(0)").animate({left:0},300);
			break;
			case 5:	//放大消失
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>");
				ban.animate({left:"-50%",top:"-50%",width:"200%",height:"200%",opacity:"toggle"},500,function(){ban.remove()});
			break;
			case 6:	//缩小消失
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>");
				ban.animate({left:"50%",top:"50%",width:"0",height:"0",opacity:"toggle"},500,function(){ban.remove()});
			break;
			case 7:	//向上消失
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>");
				ban.animate({top:"-50%",opacity:"toggle"},500,function(){ban.remove()});
			break;
			case 8:	//向下消失
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>");
				ban.animate({top:"50%",opacity:"toggle"},500,function(){ban.remove()});
			break;
			default:
				ban.before("<span style=\"background-image:url('"+list[on].img+"')\"></span>");
				ban.remove();
			break;
			};
		
		if(order==2){
			on=PZ.n3(0,len-1);
		}else{
			on++;
			if(on>=len)on=0;
			};
		timer=window.setTimeout(start,delay);
		};
	timer=window.setTimeout(start,delay);
	};
/*---------------获取点击数---------------*/
this.getarticlehits=function(did,modtype,dataid){
	$.ajax({
		type:"POST",
		url:"/?log=post&desc=getarticlehits",
		data:"modtype="+modtype+"&dataid="+dataid,
		cache:false,
		dataType:"json",
		success:function(res){
			switch(res.status){
				case 0:
					$("#"+did).html(res.data);
				break;
				};
			}
		});
	};
/*---------------评论留言---------------*/
this.comment=function(args){
	var log=args.log || "start";
	var mod=args.mod || 1;
	var size=args.size || 1;
	switch(log){
		case "editor":
			var ht=args.ht || 100;
			var html='<div class="comm_send"><a style="display:none" class="comm_send_close" href="javascript:PZ.comment({log:\'reply\'})">×</a><input type="hidden" id="tcz_comment_dataid" value="0"><div class="comm_send_inp comm_send_inp_out" contentEditable=true id="tcz_comment_content" isedit="no" style="height:'+ht+'px">'+qyklang.comment.send.text+'</div>'
				+'<div class="comm_send_btn"><div class="comm_send_btn_left"><a class="comm_btn_face" href="javascript:" title="'+qyklang.comment.send.face+'"><img src="'+tczAppsui.path+'images/b.gif"></a></div><div class="comm_send_btn_right"><a href="javascript:">'+qyklang.comment.send.btn+'</a></div><div class="comm_send_btn_name"><span class="name">'+tczAppsui.cook.uname+'</span><span>'+(tczAppsui.login?'<a href="javascript:" onclick="PZ.login({log:\'out\'})">'+qyklang.comment.send.login_out+'</a>':'<a href="javascript:" onclick="PZ.login({log:\'open\'})">'+qyklang.comment.send.login+'</a>')+'</span></div></div></div>';
			return html;
		break;
		case "reply":
			var dataid=args.dataid || 0;
			var edi=$(".comm_send");
			if(dataid>0){
				if($("#comm_li_"+dataid).find(".comm_send").length>0){
					$("#tcz_comment_content").focus();
					return;
					};
				//alert($("#comm_li_"+dataid+">.comm_list_block>.comm_list_desc").html())
				$("#comm_li_"+dataid+">.comm_list_block>.comm_list_desc").after(edi);
			}else{
				$(".ui_comment").prepend(edi);
				};
			$("#tcz_comment_dataid").val(dataid);
			$("#tcz_comment_content").focus();
			$(".comm_send").hide().fadeIn(500,function(){
				if(dataid==0){
					//$("#tcz_comment_content").blur();
					$(".comm_send_close").hide();
				}else{
					$("#tcz_comment_content").focus();
					$(".comm_send_close").show();
					};
				});
		break;
		case "start":
			var input=args.input || "ok";
			var dataid=args.dataid || tczAppsui.argid || 0;
			var bcat=args.bcat || tczAppsui.argbcat || 0;
			//alert(dataid);
			if(dataid==0)mod=2;
			var postdata="mod="+mod+"&size="+size;
			var langlist=qyklang.comment.list;
			if(mod==2)langlist=qyklang.comment.list2;
			else if(mod==1)postdata+="&dataid="+dataid+"&bcat="+bcat;
			var ht=args.ht || 40;
			var ht_on=args.ht_on || 100;
			var status=$("#tcz_comment").attr("status");
			if(status=="no"){
				var html="";
				if(input=="ok")html=PZ.comment({log:"editor",mod:mod,ht:ht});
				html+='<div class="comm_top"><div class="comm_top_left">'+langlist.title+'</div>'
				+'<div class="comm_top_right">'+langlist.tips1+'<span>...</span> '+langlist.tips2+'</div></div>'
				+'<ul class="comm_list" id="tcz_comment_list">...</ul>'
				+'<div class="comm_page" id="tcz_comment_page" style="display:none"></div>';
				$("#tcz_comment").attr("status","success").html(html);
				$("#tcz_comment_content").css({width:$("#tcz_comment_content").width()+"px"});
				$(".ui_comment").on("click",".comm_btn_face",function(){
					PZ.comment({log:"instr",cata:"face"});
					});
				$(".ui_comment").on("focus",".comm_send_inp",function(){
					if($(this).attr("isedit")!="ok")$(this).attr("isedit","ok").html("");
					$(this).removeClass("comm_send_inp_out").addClass("comm_send_inp_on");
					if(Math.floor($("#tcz_comment_dataid").val())==0)$(this).animate({height:ht_on},200);
					else $(this).css({height:"60px"});
				}).on("blur",".comm_send_inp",function(){
					if($(this).html()==""){
						$(this).attr("isedit","no").html(qyklang.comment.send.text).removeClass("comm_send_inp_on").addClass("comm_send_inp_out");
						if(Math.floor($("#tcz_comment_dataid").val())==0)$(this).animate({height:ht},200);
						};
				}).keypress(function(e){
					if(window.event.keyCode==13||e.which==13){
						e.which=0;
						window.event.keyCode=0;
						PZ.comment({log:"instr",cata:"br"});
						return false;
						};
				}).keydown(function(e){
					if(e.ctrlKey&&(e.which==86||e.which==66||e.which==13)){
						switch(e.which){
							case 13:PZ.comment({log:"send",mod:mod,size:size,dataid:dataid,bcat:bcat});break;
							case 86:
							break;
							case 66:
							break;
							};
						e.which=0;
						window.event.keyCode=0;
						return false;
						};
					});
				$(".comm_send_btn_right>a").click(function(){
					PZ.comment({log:"send",mod:mod,size:size,dataid:dataid,bcat:bcat});
					});
				};
			var page=args.page || 1;
			var scro=args.scro || false;
			var load=args.load || false;
			if(load)PZ.load({log:"open"});
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=comment_list&page="+page,
				data:postdata,
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					//alert(res);return;
					switch(res.status){
						case 0:
							var fid=Math.floor($("#tcz_comment_dataid").val());
							if(fid>0)PZ.comment({log:"reply"});
							$("#tcz_comment").find(".comm_top_right>span").html(res.cont);
							$("#tcz_comment_list").html(res.data);
							$("#tcz_comment_page").show().html(res.other);
							if(scro){
								var pos=$("#tcz_comment").find(".comm_top").offset();
								var h=pos.top;
								$("html,body").animate({scrollTop:h},500);
								};
						break;
						default:PZ.fly({msg:qyklang.comment.start.error});break;
						};
					}
				});
		break;
		case "instr":
			var cata=args.cata || "face";
			var text=args.text || "";
			switch(cata){
				case "br":
					var msg=$("#tcz_comment_content").html();
					text="<br>";
					var reg=/(<br\/?[^>]*>)$/;
					if(msg.match(reg)==null){
						text+="<br>";
						};
				break;
				case "face":
					if(args.url){
						text="<img class=\"face\" src=\""+tczAppsui.path+"images/face/"+args.url+"\">";
						if($("#tcz_face").length>0)$("#tcz_face").hide();
					}else{
						if($("#tcz_face").length>0){
							$("#tcz_face").show();
						}else{
							var html="<div class='ui_modwin' id='tcz_face' mod='face'><div class='tab' mod='face'><a class='on' href='javascript:' mod='face'>经典</a><a class='out' href='javascript:' mod='face'>毛笔</a></div>";
							html+="<div class='scro scro1' id='tcz_face_scro0'><div class='icon'>";
							for(var i=1;i<=105;i++){
								html+="<img src='"+tczAppsui.path+"images/b.gif' onclick=\"PZ.comment({log:'instr',cata:'face',url:'qq/"+(i-1)+".gif'})\" onmouseover=\"this.style.backgroundColor='#fff';this.style.backgroundImage='url("+tczAppsui.path+"images/face/qq/"+(i-1)+".gif)'\" onmouseout=\"this.style.background=''\">";
								};
							html+="</div></div>";
							html+="<div class='scro scro2' id='tcz_face_scro1' style='display:none'><div class='icon'>";
							for(var i=1;i<=26;i++){
								var xu=i<10?"0"+i:i;
								html+="<img src='"+tczAppsui.path+"images/b.gif' onclick=\"PZ.comment({log:'instr',cata:'face',url:'maobi/"+xu+".gif'})\" onmouseover=\"this.style.backgroundColor='#fff';this.style.backgroundImage='url("+tczAppsui.path+"images/face/maobi/"+xu+".gif)'\" onmouseout=\"this.style.background=''\">";
								};
							html+="</div></div>";
							html+="</div>";
							$(document.body).append(html);
							$("#tcz_face>.tab>a").each(function(i){
								$(this).bind("mouseover",function(){
									$("#tcz_face>.tab>a").attr("class","out");
									$(this).attr("class","on");
									$("#tcz_face>.scro").hide();
									$("#tcz_face_scro"+i).show();
									});
								});
							};
						var pos=$("#tcz_comment").find(".comm_send_btn").offset();
						var l=pos.left-1;
						var t=pos.top-$("#tcz_face").outerHeight()+1;
						if(t<0)t=0;
						$("#tcz_face").css({top:t+"px",left:l+"px"});
						$(document.body).bind("mouseup",function(e){
							var mod=$(e.target).attr("mod") || null;
							if(mod!="face"){
								$("#tcz_face").hide();
								$(document.body).unbind();
								};
							});
						return;
						};
				break;
				};
			var range,node;
			if(!$("#tcz_comment_content").is(":focus"))$("#tcz_comment_content").focus();
			if (window.getSelection&&window.getSelection().getRangeAt){
				range=window.getSelection().getRangeAt(0);
				range.collapse(false);
				node=range.createContextualFragment(text);
				var c=node.lastChild;
				range.insertNode(node);
				if(c){
					range.setEndAfter(c);
					range.setStartAfter(c)
					};
				//alert(range);
				var j = window.getSelection();
				j.removeAllRanges();
				j.addRange(range);
			}else if(document.selection&&document.selection.createRange){
				document.selection.createRange().pasteHTML(text);
				};
		break;
		case "send":
			var dataid=args.dataid || tczAppsui.argid || 0;
			var bcat=args.bcat || tczAppsui.argbcat || 0;
			var isedit=$("#tcz_comment_content").attr("isedit");
			var msg=PZ.trim($("#tcz_comment_content").html());
			if(isedit=="no")msg="";
			else{
				msg=msg.replace(/^\n+|\n+$/ig,"");	//过滤头尾回车
				msg=msg.replace(/&nbsp;/ig," ");	//转换空格
				msg=msg.replace(/(^\s*)|(\s*$)/ig,"");	//过滤头尾空格
				msg=msg.replace(/<br\/?[^>]*>/ig,"{br}");	//转换行
				msg=msg.replace(/<p\/?[^>]*>/ig,"{br}");	//转换行
				msg=msg.replace(/<\/p\/?[^>]*>/ig,"");	//转换行
				msg=msg.replace(/\<img(.*?)src\=\"\/([^\"]+)"([^>]?)>/ig,"{img:$2}"); //转换图片
				msg=msg.replace(/<\/?[^>]*>/ig,"");	//过滤所有HTML
				msg=msg.replace(/((\{br\})+)/ig,"{br}"); //将多个空行合并成一行
				msg=msg.replace(/^((\{br\})+)|(\{br\})*$/ig,""); //过滤头尾换行
				var msg2=msg.replace(/ |　|&nbsp;|\{br\}/g,"");
				};
			if(msg==""||msg2==""){
				$("#tcz_comment_content").html("");
				PZ.tip({log:"addone",obj:$("#tcz_comment_content"),msg:qyklang.comment.send.error1});
				//$("#tcz_comment_content").html("").focus();
				return;
				};
			var msg2=msg2.replace(/\{img:([^\}]+)\}/ig,"");
			if(msg2==""){
				PZ.tip({log:"addone",obj:$("#tcz_comment_content"),msg:qyklang.comment.send.error2});
				//$("#tcz_comment_content").focus();
				return;
				};
			msg3=msg.replace(/\{br\}|\{img:([^\}]+)\}/ig,"-");	//一个换行及表情算1个字符
			var msg_len=PZ.getlen(msg3);
			if(msg_len>1000){
				PZ.tip({log:"addone",obj:$("#tcz_comment_content"),msg:qyklang.comment.send.error3+"<span class='blue'>"+msg_len+" / 1000</span>"});
				//$("#tcz_comment_content").focus();
				return;
				};
			var scro=true;
			var fid=Math.floor($("#tcz_comment_dataid").val());
			if(fid>0){
				scro=false;
				PZ.comment({log:"reply"});
				};
			PZ.load({log:"open",msg:qyklang.comment.send.load});
			var name=PZ.en(tczAppsui.cook.uname);
			msg=PZ.en(msg);
			var postdata="name="+name+"&content="+msg;
			if(mod==1)postdata+="&dataid="+dataid+"&topid="+fid+"&bcat="+bcat;
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=comment",
				data:postdata,
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					switch(res.status){
						case 0:
							$("#tcz_comment_content").html("").trigger("blur");
							if(res.data=="yes"){
							PZ.fly({delay:500,msg:qyklang.comment.send.success,callback:function(){
								PZ.load({msg:qyklang.comment.send.reload});
								PZ.comment({log:"start",mod:mod,size:size,scro:scro,bcat:bcat,dataid:dataid});
								}});
							}else{
								PZ.e({msg:qyklang.comment.send.success_no});
								};
						break;
						default:PZ.e({ico:"error",msg:res.data});break;
						};
					}
				});
		break;
		};
	};
/*---------------心情---------------*/
this.expmood=function(args){
	var log=args.log || "start";
	var text=args.text || qyklang.expmood.text;
	var did=args.did;
	var xu=args.xu || "0";
	var text_arr=text.split(",");
	switch(log){
		case "start":
			var icon=args.icon || "1";
			var html="<div class=\"moodout\"><a href=\"javascript:\" class=\"mood1\"><div class=\"moodtip moodtip_"+icon+"\">"+text_arr[0]+"</div><div class=\"moodnum\"></div></a></div>"
			+"<div class=\"moodout\"><a href=\"javascript:\" class=\"mood2\"><div class=\"moodtip moodtip_"+icon+"\">"+text_arr[1]+"</div><div class=\"moodnum\"></div></a></div>"
			+"<div class=\"moodout\"><a href=\"javascript:\" class=\"mood3\"><div class=\"moodtip moodtip_"+icon+"\">"+text_arr[2]+"</div><div class=\"moodnum\"></div></a></div>"
			+"<div class=\"moodout\"><a href=\"javascript:\" class=\"mood4\"><div class=\"moodtip moodtip_"+icon+"\">"+text_arr[3]+"</div><div class=\"moodnum\"></div></a></div>"
			+"<div class=\"moodout\"><a href=\"javascript:\" class=\"mood5\"><div class=\"moodtip moodtip_"+icon+"\">"+text_arr[4]+"</div><div class=\"moodnum\"></div></a></div>";
			$("#"+did).html(html);
			$("#"+did+">div").bind("click",function(){
				var xu=$(this).index()+1;
				PZ.expmood({did:did,log:"click",xu:xu});
				});
		break;
		case "click":
			$("#"+did+">div").unbind();
			var obj=$("#"+did+">div>a:eq("+(xu-1)+")");
			obj.addClass("moodclick");
		break;
		};
	var func=function(){
		$.ajax({
			type:"POST",
			url:"/?log=post&desc=expmood",
			data:"xu="+xu+"&bcat="+tczAppsui.argbcat+"&id="+tczAppsui.argid,
			cache:false,
			dataType:"json",
			success:function(res){
				switch(res.status){
					case 0:
						eval("var arr="+res.data);
						for(var i=0;i<5;i++)$("#"+did).find(".moodnum:eq("+i+")").html("<span>"+arr[i].num+"</span> ("+arr[i].scale+")");
					break;
					default:
						PZ.fly({msg:res.data});
					break;
					};
				}
			});
		};
	func();
	};
/*---------------日历---------------*/
this.calendar=function(args){
	var id=args.id;
	var ym=args.ym || "";
	var mark=args.mark || "";
	$.ajax({
		type:"POST",
		url:"/?log=post&desc=calendar",
		data:"mark="+mark+"&ym="+PZ.en(ym)+"&did="+id,
		cache:false,
		dataType:"json",
		success:function(res){
			switch(res.status){
				case 0:
					$("#"+id).html(res.data);
				break;
				};
			}
		});
	};
/*---------------代码高亮---------------*/
this.showcode=function(){
	if($("#qyk_showcode").length>0)return;
	var showfunc=function(){
		$("pre").each(function(){
			var cc=$(this).attr("class");
			if(/brush/i.test(cc)){
				SyntaxHighlighter.highlight(cc);
				};
			});
		$(".syntaxhighlighter").each(function(){
			var _this=$(this);
			$(this).find(".container>.line").each(function(){
				var h=$(this).height();
				var xu=$(this).index();
				//alert(xu+" - "+h+"\n"+$(this).html());
				_this.find(".gutter>.line:eq("+xu+")").css({height:h+"px"});
				});
			});
		};
	$.getScript(tczAppsui.path+"res/SyntaxHighlighter/shCore.js",function(){
		$.ajax({
			url:tczAppsui.path+"res/SyntaxHighlighter/shCoreDefault.css",
			success:function(data){
				$('<style type="text/css">' + data.replace(/url\(images/g, 'url(/css/images') + '</style>').appendTo('head'); 
				showfunc();
				}
			});
		});
	};
/*---------------搜索---------------*/
this.search=function(args){
	var log=args.log || "start";
	var mark=args.mark || "news";
	var seartype=args.seartype || "aaa";
	if($("#qyk_sear_type").length>0)seartype=$("#qyk_sear_type").val();
	switch(log){
		case "load":
			if($("select[id='qyk_sear_mark']").length>0)PZ.select({sid:"qyk_sear_mark",w:110});
			$("#qyk_sear_word").bind("keypress",function(event){
				if(event.keyCode=="13"){
					PZ.search({mark:mark});
					};
				});
			if($("#qyk_sear_word").val()!=""&&tczAppsui.seartype==seartype){
				$("#qyk_sear_word").select();
			}else{
				$("#qyk_sear_word").val("");
				};
		break;
		case "start":
			var word=$("#qyk_sear_word").val();
			if($("#qyk_sear_mark").length>0)mark=$("#qyk_sear_mark").val();
			if(word==""){
				$("#qyk_sear_word").focus();
				PZ.fly({msg:qyklang.search.error});
				return;
				};
			if(mark==""){
				PZ.fly({msg:qyklang.search.error2});
				return;
				};
			if(seartype==""){
				PZ.fly({msg:qyklang.search.error3});
				return;
				};
			var url="/?log="+mark+"&seartype="+seartype+"&word="+PZ.en(word);
			if(tczAppsui.usestatic)url="/"+mark+"/so?word="+PZ.en(word)+"&seartype="+seartype;
			location.href=url;
		break;
		};
	};
this.login=function(args){
	var log=args.log || "open";
	var cancel=args.cancel || null;
	switch(log){
		case "go":
			var code=$("#post_user_code").val();
			var pass=$("#post_user_pass").val();
			if(code.length<5||code.length>20){
				PZ.tip({log:"addone",obj:$("#post_user_code"),msg:qyklang.login.go_tip1});
				return false;
				};
			if(pass.length<5||pass.length>20){
				PZ.tip({log:"addone",obj:$("#post_user_pass"),msg:qyklang.login.go_tip2});
				return false;
				};
			PZ.load({log:"open"});
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=login",
				data:"code="+PZ.en(code)+"&pass="+PZ.en(pass),
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					//alert(res);return;
					switch(res.status){
						case 0:
							var gourl="";
							if($("#post_gourl").length>0)gourl=$("#post_gourl").val();
							if(gourl!="")location.href=gourl;
							else PZ.reload();
						break;
						case 1:
							PZ.tip({log:"addone",obj:$("#post_user_code"),msg:res.data});
						break;
						case 2:
							PZ.tip({log:"addone",obj:$("#post_user_pass"),msg:res.data});
						break;
						default:PZ.e({ico:"error",msg:res.data});break;
						};
					}
				});
			return false;
		break;
		case "out":
			var outfunc=function(){
				PZ.load({log:"open"});
				$.ajax({
					type:"GET",
					url:"/?log=post&desc=login_out",
					cache:false,
					dataType:"json",
					success:function(res){
						PZ.load({log:"close"});
						switch(res.status){
							case 0:
								if(args.gofunc){
									args.gofunc();
								}else if(args.callback){
									window.location.href=args.callback;
								}else{
									PZ.reload();
								};
							break;
							default:PZ.e({ico:"error",msg:res.data});break;
							};
						}
					});
			};
			var direct=args.direct || "no";
			if(direct=="ok")outfunc();
			else{
				PZ.e({ico:"alert",msg:qyklang.login.out_tip,btn:[
					{text:qyklang.login.out_btn1,callback:outfunc},
					{text:qyklang.login.out_btn2,close:"ok"}
				]});
			};
		break;
		case "open":
			var ww=$(window).width()-80;
			ww=ww>280?280:ww;
			var apilen=tczAppsui.loginapi.weixin+tczAppsui.loginapi.qq+tczAppsui.loginapi.weibo+tczAppsui.loginapi.id+tczAppsui.loginapi.phone;
			var fsize=[0,120,90,66,66,66,66][apilen];
			var fwidth=ww*([100,100,44,33.3333,33.3333,33.3333,33.3333][apilen])/100;
			var fontcss="width:"+fwidth+"px;font-size:"+fsize+"px;height:"+(fsize+20)+"px";
			var api="";
			if(tczAppsui.loginapi.weixin){
				if(apilen==1){
					PZ.login({log:"wxlogin",cancel:cancel});
					return;
					};
				api+="<a class=\"wxico\" href=\"javascript:\" onclick=\"PZ.login({log:'wxlogin'});\" title=\""+qyklang.login.api_tip2+"\"><span class=\"qykicon\" style=\""+fontcss+"\">&#xe647;</span><div class=\"logintxt\">"+qyklang.login.api_tip2+"</div></a>";
				};
			if(tczAppsui.loginapi.qq){
				if(apilen==1){
					PZ.login({log:"qqlogin",cancel:cancel});
					return;
					};
				api+="<a class=\"qqico\" href=\"javascript:\" onclick=\"PZ.login({log:'qqlogin'});\" title=\""+qyklang.login.api_tip1+"\"><span class=\"qykicon\" style=\""+fontcss+"\">&#xe616;</span><div class=\"logintxt\">"+qyklang.login.api_tip1+"</div></a>";
				};
			if(tczAppsui.loginapi.weibo){
				if(apilen==1){
					PZ.e({msg:"很抱歉，尚未支持新浪微博登录"});
					return;
					};
				api+="<a class=\"wbico\" href=\"javascript:\" onclick=\"PZ.login({log:'code'});\" title=\""+qyklang.login.api_tip3+"\"><span class=\"qykicon\" style=\""+fontcss+"\">&#xe847;</span><div class=\"logintxt\">"+qyklang.login.api_tip3+"</div></a>";
				};
			if(tczAppsui.loginapi.phone){
				if(apilen==1){
					PZ.login({log:"phone",cancel:cancel});
					return;
					};
				api+="<a class=\"sjico\" href=\"javascript:\" onclick=\"PZ.login({log:'phone'});\" title=\"手机验证码\"><span class=\"qykicon\" style=\""+fontcss+"\">&#xe846;</span><div class=\"logintxt\">手机验证码</div></a>";
				};
			if(tczAppsui.loginapi.id){
				if(apilen==1){
					PZ.login({log:"code",cancel:cancel});
					return;
					};
				api+="<a class=\"idico\" href=\"javascript:\" onclick=\"PZ.login({log:'code'});\" title=\"账号密码\"><span class=\"qykicon\" style=\""+fontcss+"\">&#xe846;</span><div class=\"logintxt\">账号密码</div></a>";
				};
			var html="<div class=\"ui_login_api\" style=\"text-align:"+(apilen<3?"center":"left")+";_width:"+ww+"px;min-width:"+ww+"px\">"+api+"</div>";
			var func=function(){
				var wid=PZ.win({title:qyklang.login.open_title_1,id:"win_login",close:"no",shadow:10,content:html,btn:[
							{text:"取 消",callback:function(){
								PZ.win({log:"close",id:"win_login"});
								if(cancel!=null)cancel();
								}}
							]});
				};
			if($("#win_login").length>0){
				PZ.win({log:"close",id:"win_login",callback:func});
			}else func();
		break;
		case "phone_yzm":
		case "phone_go":
			var phone=$("#post_user_phone").val();
			var pass=$("#post_user_pass").val();
			var nick=$("#post_user_nick").val();
			if(phone.length!=11){
				PZ.tip({log:"addone",obj:$("#post_user_phone"),msg:"错误的手机号码"});
				return false;
				};
			if(log=="phone_go"){
				if($(".ui_login>.nick").is(":hidden")){
					if(nick==""){
						PZ.tip({log:"addone",obj:$("#post_user_nick"),msg:"请设置一个称呼"});
						return false;
						};
					};
				if(pass.length!=6){
					PZ.tip({log:"addone",obj:$("#post_user_pass"),msg:"错误的验证码"});
					return false;
					};
			}else{
				if($(".ui_login>.list>.send").attr("status")=="no")return;
				};
			PZ.load({log:"open"});
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=login_phone",
				data:"types="+log+"&phone="+phone+"&pass="+pass+"&nick="+nick,
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					//alert(res);return;
					switch(res.status){
						case 0:
							if(log=="phone_go"){
								var gourl="";
								if($("#post_gourl").length>0)gourl=$("#post_gourl").val();
								if(gourl!="")location.href=gourl;
								else PZ.reload();
							}else{
								PZ.blacktip({msg:"验证码已发送"});
								$("#post_user_phone").attr("readonly",false);
								//$("#post_user_nick").attr("readonly",false);
								var sec=61;
								var secgo=function(){
									if($(".ui_login>.list>.send").length==0)return;
									sec--;
									$(".ui_login>.list>.send").attr("status","no").html(sec);
									if(sec==1){
										$(".ui_login>.list>.send").attr("status","ok").html("发送验证码");
										return;
										};
									window.setTimeout(secgo,1000);
									};
								secgo();
								
								if(res.other=="ok"){
									$(".ui_login>.nick").show();
									PZ.win({log:"change",id:"win_login",callback:function(){
										PZ.blacktip({msg:"该号码为新用户"});
										}});
									};
								};
						break;
						case 1:
							PZ.tip({log:"addone",obj:$("#post_user_phone"),msg:res.data});
						break;
						case 2:
							PZ.tip({log:"addone",obj:$("#post_user_pass"),msg:res.data});
						break;
						case 9:
							$(".ui_login>.nick").show();
							PZ.win({log:"change",id:"win_login",callback:function(){
								PZ.tip({log:"addone",obj:$("#post_user_nick"),msg:res.data});
								}});
						break;
						default:PZ.e({ico:"error",msg:res.data});break;
						};
					}
				});
		break;
		case "phone":
			if($("#post_user_phone").length>0){
				PZ.win({log:"close",id:"win_login"});
				$("#post_user_phone").focus();
				return;
				};
			var func=function(){
				var ww=$(window).width()-80;
				var css=ww>360?"":"width:"+ww+"px";
				var api="";
				var html="<div class=\"ui_login\" style=\""+css+"\">"+
					"<div class=\"list\"><span class=\"ico qykicon\">&#xe66b;</span><input type=\"number\" maxlength=11 id=\"post_user_phone\" placeholder=\"手机号码\"></div>"+
					"<div class=\"list nick\" style=\"display:none\"><span class=\"ico qykicon\">&#xe660;</span><input type=\"text\" maxlength=50 id=\"post_user_phone\" placeholder=\"首次登录，请输入称呼\"></div>"+
					"<div class=\"list\"><a status=\"ok\" class=\"send\" href=\"javascript:\" onclick=\"PZ.login({log:'phone_yzm'})\">发送验证码</a><span class=\"ico qykicon\">&#xe659;</span><input maxlength=6 type=\"number\" id=\"post_user_pass\" placeholder=\"6位数字\"></div>"+
					"<div class=\"btn\"><a href=\"javascript:\" onclick=\"PZ.login({log:'phone_go'})\">登 录</a></div>"+
					"</div>";
				var btnarr=[{text:"取 消",callback:function(){
						PZ.win({log:"close",id:"win_login"});
						if(cancel!=null)cancel();
						}}];
				if(tczAppsui.loginapi.weixin||tczAppsui.loginapi.qq||tczAppsui.loginapi.weibo||tczAppsui.loginapi.phone){
					btnarr.unshift({text:qyklang.login.open_btn4,callback:function(){
						PZ.login({log:"open"});
						}});
					};
				var wid=PZ.win({title:"手机登录",id:"win_login",close:"ok",shadow:10,content:html,callback:function(){
						//$(".ui_login>.close").click(function(){PZ.win({log:"close",id:wid})});
						$("#post_user_phone").focus().bind("keypress",function(){
							if(event.keyCode=="13")$('#post_user_pass').focus();
							});
						$('#post_user_pass').bind('keypress',function(event){
							if(event.keyCode=="13")PZ.login({log:"phone_go"});
							});
						},btn:btnarr});
				};
			if($("#win_login").length>0){
				PZ.win({log:"close",id:"win_login",callback:func});
			}else func();
		break;
		case "code":
			if($("#post_user_code").length>0){
				PZ.win({log:"close",id:"win_login"});
				$("#post_user_code").focus();
				return;
				};
			var func=function(){
				var ww=$(window).width()-80;
				var css=ww>360?"":"width:"+ww+"px";
				var api="";
				var html="<div class=\"ui_login\" style=\""+css+"\">"+
					"<div class=\"list\"><span class=\"ico qykicon\">&#xe660;</span><input type=\"text\" id=\"post_user_code\" placeholder=\""+qyklang.login.open_tip1+"\"></div>"+
					"<div class=\"list\"><span class=\"ico qykicon\">&#xe603;</span><input type=\"password\" id=\"post_user_pass\" placeholder=\""+qyklang.login.open_tip2+"\"></div>"+
					"<div class=\"btn\"><a href=\"javascript:\" onclick=\"PZ.login({log:'go'})\">"+qyklang.login.open_btn5+"</a></div>"+
					"</div>";
				var btnarr=[
					{text:qyklang.login.open_btn3,callback:function(){
						PZ.win({log:'close',id:'win_login',callback:function(){PZ.findpass({log:"open"})}});
						}}
					];
				if(tczAppsui.loginapi.idreg!=9){
					btnarr.unshift({text:qyklang.login.open_btn2,callback:function(){
						PZ.win({log:'close',id:'win_login',callback:function(){PZ.reg({log:"open"})}});
						}});
					};
				if(tczAppsui.loginapi.weixin||tczAppsui.loginapi.qq||tczAppsui.loginapi.weibo||tczAppsui.loginapi.phone){
					btnarr.unshift({text:qyklang.login.open_btn4,callback:function(){
							PZ.login({log:"open"});
							}});
					};
				var wid=PZ.win({title:qyklang.login.open_title_2,id:"win_login",close:"ok",shadow:10,content:html,callback:function(){
						//$(".ui_login>.close").click(function(){PZ.win({log:"close",id:wid})});
						$("#post_user_code").focus().bind("keypress",function(){
							if(event.keyCode=="13")$('#post_user_pass').focus();
							});
						$('#post_user_pass').bind('keypress',function(event){
							if(event.keyCode=="13")PZ.login({log:"go"});
							});
						},btn:btnarr});
				};
			if($("#win_login").length>0){
				PZ.win({log:"close",id:"win_login",callback:func});
			}else func();
		break;
		case "qqlogin":
			var url=tczAppsui.path+"plugins/qqlogin/api.php?state="+PZ.en(location.href);
			if(tczAppsui.mobile){
				location.href=url;
				return;
				};
			var html="<div style='width:580px;height:400px'><iframe frameborder=\"0\" scrolling=\"auto\" height=\"100%\" width=\"100%\" src=\""+url+"\"></iframe></div>";
			PZ.win({title:qyklang.login.api_tip1,content:html});
		break;
		case "wxlogin":
			var gourl=location.href;
			//var shopid=wx.setup.shopid || 0;//门店ID
			if(tczAppsui.mobile){
				if(PZ.getHardware({types:"iswx"}))location.href=tczAppsui.path+"plugins/wxlogin/login.php?gourl="+PZ.en(gourl);
				else{
					PZ.fly({ico:"error",msg:"请在微信中登录使用"});
					//PZ.fly({ico:"alert",delay:2000,msg:"本页面需微信登录后使用，请在微信中访问"});
				} 
				return;
				};
			var url=tczAppsui.path+"plugins/wxlogin/api.php?gourl="+PZ.en(gourl);
			var html="<div style='width:580px;height:360px;overflow:hidden'><iframe frameborder=\"0\" scrolling=\"auto\" height=\"100%\" width=\"100%\" src=\""+url+"\"></iframe></div>";
			PZ.win({title:qyklang.login.api_tip2,content:html});
		break;
		};
	};
this.reg=function(args){
	var log=args.log || "open";
	switch(log){
		case "success":
			var ww=$(window).width()-80;
			var css=ww>360?"":"width:"+ww+"px";
			var func=function(){
				var html="<div class=\"ui_login\" style=\""+css+"\">"+
					"<div class=\"success\">"+qyklang.reg.success_tip+"<br><span>"+args.email+"</span></div>"+
					"<div class=\"btn\"><a href=\"javascript:\" onclick=\"PZ.reload();\">"+qyklang.reg.success_btn+"</a></div>"+
					"</div>";
				var wid=PZ.win({id:"win_login",close:"no",shadow:10,content:html});
				};
			if($("#win_login").length>0){
				PZ.win({log:"close",id:"win_login",callback:function(){
					func();
					}});
			}else{
				func();
				};
		break;
		case "go":
			var code=$("#post_user_code2").val();
			var pass=$("#post_user_pass1").val();
			var email=$("#post_user_email").val();
			if(code.length<5||code.length>20){
				PZ.tip({log:"addone",obj:$("#post_user_code2"),msg:qyklang.reg.go_tip1});
				return;
				};
			if(pass.length<5||pass.length>20){
				PZ.tip({log:"addone",obj:$("#post_user_pass1"),msg:qyklang.reg.go_tip2});
				return;
				};
			if(pass!=$("#post_user_pass2").val()){
				PZ.tip({log:"addone",obj:$("#post_user_pass2"),msg:qyklang.reg.go_tip3});
				return;
				};
			if(email=="")email="*";
			var email_tip=PZ.regular(email,'email');
			if(email_tip!=""){
				PZ.tip({log:"addone",obj:$("#post_user_email"),msg:email_tip});
				return;
				};
			PZ.load({log:"open"});
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=reg",
				data:"code="+PZ.en(code)+"&pass="+PZ.en(pass)+"&email="+PZ.en(email),
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					//alert(res);return;
					switch(res.status){
						case 0:
							PZ.reg({log:"success",email:email});
						break;
						case 1:PZ.tip({log:"addone",obj:$("#post_user_code2"),msg:qyklang.reg.go_tip1});break;
						case 2:PZ.tip({log:"addone",obj:$("#post_user_pass1"),msg:qyklang.reg.go_tip2});break;
						case 3:PZ.tip({log:"addone",obj:$("#post_user_email"),msg:qyklang.reg.go_tip4});break;
						case 4:PZ.tip({log:"addone",obj:$("#post_user_code2"),msg:qyklang.reg.go_tip5});break;
						case 5:PZ.tip({log:"addone",obj:$("#post_user_email"),msg:qyklang.reg.go_tip6});break;
						default:PZ.fly({msg:res.data});break;
						};
					}
				});
		break;
		case "open":
			var ww=$(window).width()-80;
			var css=ww>360?"":"width:"+ww+"px";
			var html="<div class=\"ui_login\" style=\""+css+"\">"+
				"<div class=\"list\"><span class=\"ico qykicon\">&#xe660;</span><input type=\"text\" id=\"post_user_code2\" placeholder=\""+qyklang.reg.open_tip1+"\"></div>"+
				"<div class=\"list\"><span class=\"ico qykicon\">&#xe603;</span><input type=\"password\" id=\"post_user_pass1\" placeholder=\""+qyklang.reg.open_tip2+"\"></div>"+
				"<div class=\"list\"><span class=\"ico qykicon\">&#xe603;</span><input type=\"password\" id=\"post_user_pass2\" placeholder=\""+qyklang.reg.open_tip3+"\"></div>"+
				"<div class=\"list\"><span class=\"ico qykicon\">&#xe63e;</span><input type=\"text\" id=\"post_user_email\" placeholder=\""+qyklang.reg.open_tip4+"\"></div>"+
				"<div class=\"btn\"><a href=\"javascript:PZ.reg({log:'go'})\">"+qyklang.reg.open_btn1+"</a></div>"+
				//"<div class=\"link\"><a href=\"javascript:PZ.win({log:'close',id:'win_login',callback:function(){PZ.login({log:'open'})}})\">"+qyklang.reg.open_btn2+"</a></div>"+
				"</div>";
			var wid=PZ.win({title:qyklang.reg.open_title,id:"win_login",close:"ok",shadow:10,content:html,callback:function(){
					$(".ui_login>.close").click(function(){PZ.win({log:"close",id:wid})});
					$("#post_user_code2").focus().bind("keypress",function(){
						if(event.keyCode=="13")$('#post_user_pass1').focus();
						});
					$('#post_user_pass1').bind('keypress',function(event){
						if(event.keyCode=="13")PZ.login({log:"go"});
						});
					},btn:[
						{text:qyklang.reg.open_btn2,callback:function(){
							PZ.win({log:'close',id:'win_login',callback:function(){PZ.login({log:'open'})}});
							}},
						{text:qyklang.reg.open_btn3,callback:function(){
							PZ.win({log:'close',id:'win_login',callback:function(){PZ.findpass({log:'open'})}});
							}}
						]});
		break;
		};
	};
this.findpass=function(args){
	var log=args.log || "open";
	switch(log){
		case "go":
			var yzm=$("#post_user_yzm").val();
			var pass=$("#post_user_pass1").val();
			var email=$("#post_user_find").val();
			if($(".ui_login>.yzm").is(":hidden")){
				if(email=="")email="*";
				var email_tip=PZ.regular(email,'email');
				if(email_tip!=""){
					PZ.tip({log:"addone",obj:$("#post_user_find"),msg:email_tip});
					return;
					};
				yzm="get";
			}else{
				if(yzm.length!=32){
					PZ.tip({log:"addone",obj:$("#post_user_yzm"),msg:qyklang.findpass.go_tip3});
					return;
					};
				if(pass.length<5||pass.length>20){
					PZ.tip({log:"addone",obj:$("#post_user_pass1"),msg:qyklang.findpass.go_tip4});
					return;
					};
				if(pass!=$("#post_user_pass2").val()){
					PZ.tip({log:"addone",obj:$("#post_user_pass2"),msg:qyklang.findpass.go_tip5});
					return;
					};
				};
			PZ.load({log:"open"});
			$.ajax({
				type:"POST",
				url:"/?log=post&desc=findpass",
				data:"email="+PZ.en(email)+"&yzm="+yzm+"&pass="+pass,
				cache:false,
				dataType:"json",
				success:function(res){
					PZ.load({log:"close"});
					//alert(res);return;
					switch(res.status){
						case 0:	//成功找回
							PZ.win({log:"close",id:"win_login",callback:function(){
								PZ.fly({msg:qyklang.findpass.go_tip6,callback:function(){
									PZ.login({log:"open"});
									}});
								}});
						break;
						case 10:	//邮箱手机错误
							PZ.tip({log:"addone",obj:$("#post_user_find"),msg:qyklang.findpass.go_tip2});
						break;
						case 11:	//成功获取验证码
							$(".ui_login>.yzm").show();
							$(".ui_login>.pass").show();
							$("#post_user_find").attr("readonly",false);
							$("#post_user_btn").html(qyklang.findpass.open_btn2);
							PZ.win({log:"change",id:"win_login",callback:function(){
								PZ.tip({log:"addone",obj:$("#post_user_yzm"),msg:qyklang.findpass.go_tip1});
								//$("#post_user_yzm").focus();
								}});
						break;
						case 12:	//验证码错误
							PZ.tip({log:"addone",obj:$("#post_user_yzm"),msg:qyklang.findpass.go_tip3});
						break;
						case 13:
							PZ.tip({log:"addone",obj:$("#post_user_find"),msg:qyklang.findpass.go_tip7});
						break;
						default:PZ.fly({msg:res.data});break;
						};
					}
				});
		break;
		case "open":
			var ww=$(window).width()-80;
			var css=ww>360?"":"width:"+ww+"px";
			var html="<div class=\"ui_login\" style=\""+css+"\">"+
				"<div class=\"list\"><span class=\"ico qykicon\">&#xe660;</span><input type=\"text\" id=\"post_user_find\" placeholder=\"认证邮箱\"></div>"+
				"<div class=\"list yzm\" style=\"display:none\"><span class=\"ico qykicon\">&#xe659;</span><input type=\"text\" id=\"post_user_yzm\" placeholder=\""+qyklang.findpass.open_tip2+"\"></div>"+
				"<div class=\"list\" style=\"display:none\"><span class=\"ico qykicon\">&#xe603;</span><input type=\"password\" id=\"post_user_pass1\" placeholder=\""+qyklang.findpass.open_tip3+"\"></div>"+
				"<div class=\"list\" style=\"display:none\"><span class=\"ico qykicon\">&#xe603;</span><input type=\"password\" id=\"post_user_pass2\" placeholder=\""+qyklang.findpass.open_tip4+"\"></div>"+
				"<div class=\"btn\"><a id=\"post_user_btn\" href=\"javascript:PZ.findpass({log:'go'})\">"+qyklang.findpass.open_btn1+"</a></div>"+
				//"<div class=\"link\"><a href=\"javascript:PZ.win({log:'close',id:'win_login',callback:function(){PZ.login({log:'open'})}})\">"+qyklang.findpass.open_btn3+"</a><span></span><a href=\"javascript:PZ.win({log:'close',id:'win_login',callback:function(){PZ.reg({log:'open'})}})\">"+qyklang.findpass.open_btn4+"</a></div>"+
				"</div>";
			var wid=PZ.win({title:qyklang.findpass.open_title,id:"win_login",close:"ok",shadow:10,content:html,callback:function(){
					$(".ui_login>.close").click(function(){PZ.win({log:"close",id:wid})});
					$("#post_user_find").focus();
					},btn:[
						{text:qyklang.findpass.open_btn3,callback:function(){
							PZ.win({log:'close',id:'win_login',callback:function(){PZ.login({log:'open'})}});
							}},
						{text:qyklang.findpass.open_btn4,callback:function(){
							PZ.win({log:'close',id:'win_login',callback:function(){PZ.reg({log:'open'})}});
							}}
						]});
		break;
		};
	};
/*---------------获得硬件平台信息---------------*/
this.getHardware=function(args){
	var types=args.types || "sys";
	switch(types){
		case "iswx":
			var ua=navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
			}else{
				return false;
				};
		break;
		case "sys":
			
		break;
		};
	};
/*---------------刷新页面---------------*/
this.reload=function(){
	//window.location.href=window.location.href;
	//alert(window.location.href);
	var arr=(window.location.href+"#").split("#");
	var url=arr[0];
	if(url.indexOf("&qyktm=")!=-1){
		url=(url.split("&qyktm="))[0];
		};
	url=url+((url.indexOf("=")!=-1)?"&":"")+"qyktm="+new Date().getTime();
	if(arr[1]!="")url+="#"+arr[1];
	//alert(url);
	window.location.href=url;
	};
/*---------------上一页链接---------------*/
this.gopre=function(url){
	//alert(window.history.length);
	var plen=window.history.length || 1;
	if(plen>1){
		//alert(JSON.stringify(window.history))
		window.history.go(-1);
		return;
		};
	var pre=document.referrer;
	if(pre)window.history.go(-1);
	else location.href=url;
	};
/*---------------手机中快速响应点击---------------*/
this.mlink=function(func){
	func();
	};
/*---------------事件任务---------------*/
this.ready=function(args){
	var log=args.log || "add";
	switch(log){
		case "start":
			for(var i=0;i<ready_callback.length;i++){
				var lib=ready_callback[i];
				if(lib.delay>0){
					window.setTimeout(lib.func,lib.delay);
					}else lib.func();
				};
		break;
		case "add":
			var delay=args.delay || 0;
			ready_callback.push({delay:delay,func:args.callback});
		break;
		};
	};
};
$(document).ready(function(){
PZ.ready({log:"start"});
var timer;
var changewin=function(){
	var func=function(){
		if($(".win_block").length>0){
			$(".win_block").each(function(){
				PZ.win({id:$(this).attr("id"),log:"change",animate:99});
				});
			};
		$("#tcz_window").css({height:$(document).height()+"px"});
		};
	window.clearTimeout(timer);
	timer=window.setTimeout(func,100);
	};
$(window).bind("resize",changewin);
PZ.photobox({qykphoto:"qyk_photobox"});
//表格
if($("tr.firstRow").length>0){
	$.getScript(tczAppsui.path+"js/parse.js",function(){
		var go=true;
		var tab=null;
		while(go){
			if(!tab)var par=$("tr.firstRow:eq(0)").parent();
			else var par=tab.parent();
			tab=par;
			var tn=par.prop("tagName");
			if(tn=="TBODY"||tn=="P"||tn=="TABLE")continue;
			var css=tab.attr("class");
			if(css=="")continue;
			css=css.split(" ")[0];
			var mw=tab.width();
			var tw=$("tr.firstRow:eq(0)").width();
			if(tw>mw){
				$("tr.firstRow:eq(0)").parent().parent().css({width:mw+"px"});
				};
			uParse('.'+css);
			go=false;
			}
		});
	};
});