/*requireJS*/
require.config({
 //enforceDefine: true,
	//設定別名
  paths: {
    jquery : [
		"//code.jquery.com/jquery-2.0.2",// cdn
		//If the CDN location fails, load from this location
		"vendor/jquery-2.0.2"
	],
    "modernizr": "vendor/modernizr-2.6.2-respond-1.1.0.min",
	"bootstrap": "vendor/bootstrap.min",
	"idangerous.swiper":"vendor/idangerous.swiper"
  }
});



/* 
備注:
	require的順序與callback function的參數順序有關
	jQuery 預設的 namespace 是 $
	
Ex:

require([
  '../lib/a',
  'jquery'
  '../lib/c',
  '../lib/d',
], function (moduleA, $, moduleC) {
  moduleA.doSomething();
  $.doSomething();
  moduleC.doSomething();
  namespaceD.doSomething();
});
*/

//載入模組
require([
	'jquery',
	'modernizr',
	'bootstrap',
	'idangerous.swiper'
], function ($) {
	// 主程式
	$(function(){	
		/*ajax_g();
		reminderTab();
		one_server_side();
		myClickEvent();*/
		
  var holdPosition = 0;
  var mySwiper = new Swiper('.swiper-container',{
    slidesPerView:'auto',
    mode:'vertical',
    watchActiveIndex: true,
    onTouchStart: function() {
      holdPosition = 0;
	
	
    }

    
  })		
		
		
		
	});// $ end
  

}); //require end

	
  /*      
    // 偵錯用    
    $.ajax({
      url: "http://127.0.0.1:3000/myjsonp",
      type: "GET",
      dataType: "json",
      success: function(Jdata) {
        alert("SUCCESS!!!");
      },   
    error : function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(XMLHttpRequest.status);      
            alert(XMLHttpRequest.readyState);    
            alert(textStatus);
    }

    }); 
  */  
  
    //全域變數,YQL分析失敗次數用來判斷切換模式
    var one_errorloadConut = 0; 
    var two_errorloadConut = 0; 
	var speed = 300;
  	
	/*ajax 全域設定*/
    function ajax_g(){
		$(document).ajaxStart(function() {
		  console.log("/****************************解析中****************************/");
		  $("article").html('<div class="loadimg"><img  src="images/ajax-loader.gif " /></div>');
		})
		.ajaxError(function( event, jqxhr, settings, exception ) {
		  console.log("/****************************偵錯****************************/");
		  //if ( settings.url == "http://127.0.0.1:3000/myjsonp" ) {}
		  console.log("ajaxError url :\n"+settings.url);
		});
    }
  
    function myClickEvent(){
			//青空
		$("#one").click(function(){
			$(this).parent().addClass("active");
			$("#two").parent().removeClass("active");
				one_server_side();
		});
		//dm456
		$("#two").click(function(){
			$(this).parent().addClass("active");
			$("#one").parent().removeClass("active");
			two_server_side();
		});	
		//一周目錄
		$('#myTab a').click(function (e) {
			  e.preventDefault();
			  $(this).tab('show');
			  $(".tab-content").hide().fadeIn(speed);	
		})
    }
  
    //抓伺服器讀取的jsonp
	function one_server_side(){
		console.log("/**************server side 開始擷取青空動漫****************/\n\n");
		
		$.getJSON("myjsonp?num=1",cartoon_1)
		 .done(function() { console.log( "解析完畢...." ); })
		 .fail(function() {
			one_errorloadConut++;
			console.log( "server 讀取jsonp失敗,轉換client side 抓jsonp" ); 
			console.log("one_errorloadConut="+one_errorloadConut);
			if(one_errorloadConut >= 2){
				$("article").html("<h1 class=\"text-error\">讀取失敗! 請檢查網路連線</h1>");
				console.log("server client side 皆失敗");
			}else{	
				//轉換成用戶端抓
				one_client_side();
			}
		 });    
	}	

	function two_server_side(){
		console.log("/**************server side 開始擷取dm456****************/\n\n");
			
		$.getJSON("myjsonp?num=2",cartoon_2)
		.done(function() { console.log( "解析完畢...." ); })
		.fail(function() {
			two_errorloadConut++;
			console.log( "server 讀取jsonp失敗,轉換client side 抓jsonp" ); 
			console.log("two_errorloadConut="+two_errorloadConut);
			if(two_errorloadConut >= 2){
				$("article").html("<h1 class=\"text-error\">讀取失敗! 請檢查網路連線</h1>");
				console.log("server client side 皆失敗");
			}else{		
				two_client_side();
			}
		 }); 
	}

	//client side 直接抓jonp
	function one_client_side(){
		console.log("/**************client side開始擷取青空動漫****************/\n\n");

		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fqingkong.net%2Fanime%2Frenew%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22summary%22%5D'&format=json&diagnostics=true&callback=?",cartoon_1)
		 .done(function() { console.log( "解析完畢...." ); })
		 fail(function() {
			one_errorloadConut++;
			console.log("one_errorloadConut="+one_errorloadConut);
			if(one_errorloadConut >= 2){
				$("article").html("<h1 class=\"text-error\">讀取失敗! 請檢查網路連線</h1>");
				console.log("server client side 皆失敗");
			}else{
				console.log( "client side 讀取jsonp失敗,轉換server side 抓jsonp" ); 
				one_server_side();				
			}
		 });    
	}	
	
	function two_client_side(){
		console.log("/**************client side開始擷取動漫456****************/\n\n");

		 $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fwww.dm456.com%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22hotUpdateList%22%5D'&format=json&diagnostics=true&callback=?",cartoon_2)
		 .done(function() { console.log( "解析完畢...." ); })
		 .fail(function() {
			one_errorloadConut++;
			console.log("two_errorloadConut="+two_errorloadConut);
			if(two_errorloadConut >= 2){
				$("article").html("<h1 class=\"text-error\">讀取失敗! 請檢查網路連線</h1>");
				console.log("server client side 皆失敗");
			}else{
				console.log( "client side 讀取jsonp失敗,轉換server side 抓jsonp" ); 
				two_server_side();				
			}
		 }); 
	}	

//青空資料分析
function cartoon_1 (data){
				
	try{
		console.log(data);
        var ary = data.query.results.div;

		var out = "<ul>";
		for(index in ary){
			var href = ary[index].div.div.a.href;
			var title = ary[index].div.div.a.title;
			var season ;
			var release ;
			switch(ary[index].div.div.span.length){
			case 3:
				season = ary[index].div.div.span[1].content;
				release = ary[index].div.div.span[2].content;
				break;
			case 2:
				eason = ary[index].div.div.span[0].content;
				release = ary[index].div.div.span[1].content;
				break;
			case undefined:
				season = "未知";
				release = ary[index].div.div.span.content;	
				break;							 
			default:
				season = "未知";
				release = "未知";
				break;						
			}
			out += "<li><a href="+href+" target=\"_blank\" ><div><h2>"+title+"</h2><span class=\"text-error\">"+season+"</span>    <span class=\"text-success\">"+release+"</span></div></a><hr/></li>";
						
		    console.log("["+index+"]title:"+title);
	        console.log("href:"+href);		
			console.log("season:"+season);                                            
			console.log("release:"+release);
						
			console.log(ary[index].div.div.span.length);
			console.log('/*******************************************************');     
			console.log(ary[index].div.div.a);
			console.log(ary[index].div.div.span);
					
		}
		out+= "</ul>"                           
		$(".swiper-wrapper").html(out).hide().fadeIn(speed);
	
	}catch (e) {
		if (e instanceof TypeError ){
			console.log("YQL回傳失敗:"+e.toString());
			$("article").html("<h1 class=\"text-error\">讀取失敗! 請重試</h1>");
		//else if (e instanceof )
		}else{
			console.log("未知錯誤:"+e.toString());
		}
	}		
}	

//dm456資料分析
function cartoon_2(data){
	
	try{
		var ary = data.query.results.div.ul.li;
  		var out = "<ul>";
  		console.log(ary);
  			for(index in ary){
  				var href = "http://www.dm456.com/" +ary[index].p.span.a.href;
  				var count = ary[index].p.span.a.content;
  				var title = ary[index].a.title +" "+count;
  					
  				console.log("["+index+"]title:"+title);
  				console.log("href:"+href);	
  					
  				out += "<li><a href="+href+" target=\"_blank\" ><div><h2>"+title+"</h2></div></a><hr/></li>";
  			}
			
  		out+= "</ul>"
  		$("article").html(out).hide().fadeIn(speed);	
	}
	catch (e) {
		if (e instanceof TypeError ){
			console.log("YQL回傳失敗:"+e.toString());
			$("article").html("<h1 class=\"text-error\">讀取失敗! 請重試</h1>");			
		}else{
			console.log("未知錯誤:"+e.toString());
		}
	}	
 }	
 
 //dm456一周目錄
 function reminderTab(){
 		//alert(localStorage.getItem("data"));
		
	//使用HTML5 LocalStorage,假如沒有	LocalStorage數據,直接重抓YQL
	if(localStorage.getItem("data") == null){
		var _data = null;
	/* 	var yql = "http://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://www.dm456.com/' and xpath='//*[@id='reminderContent']/ul'"
			type ="&format=json",
			diagnostics = "&diagnostics=true", 
			callback ="&callback=?" ; */
	 
		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%22http://www.dm456.com/%22%20and%20xpath='//*[@id=%22reminderContent%22]/ul'&format=json&diagnostics=true&callback=?",function(data){
			
			_data = data;						
			reminderTab_Parse(data);
			console.log("/******************************每周更新******************************/");
		})
		.done(function() { 	
			localStorage.setItem("data",JSON.stringify(_data));
			console.log( "reminderTab 解析完畢...." ); 
		})
		.fail(function() {	console.log( "reminderTab 失敗" ); }); 	
	}else{
		//使用LocalStorage數據分析
			//alert("localstorage");
			var data = JSON.parse(localStorage.getItem("data"));
			reminderTab_Parse(data);
	}	
 }
 
  //dm456一周目錄分析
 function reminderTab_Parse(data){
 
 			var out = "";
			var days_ = [1,2,3,4,5,6,0];
			var ary = data.query.results.ul;
			var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
			console.log( new Date().getDay() == 0 ? "今天是星期日\n" : "今天是星期"+new Date().getDay()+"\n");
			
			for(index in ary){ // 7
				console.log(days[index]+"\n");
				
				var li_length = ary[index].li.length;
				//console.log("["+index+"]length:"+li_length);
				var li_ary =  ary[index].li;
				
				
				//out += '<div class="tab-pane" id="'+days[index]+'"><ul>';
				new Date().getDay() == days_[index] ? out += '<div class="tab-pane active" id="'+days[index]+'"><ul>' : out += '<div class="tab-pane" id="'+days[index]+'"><ul>';
				
				new Date().getDay() == days_[index] ? $("#myTab a[href=#"+days[index]+"]").parent().addClass("active") : "";
				
				for(count in li_ary){
					var href = "http://www.dm456.com/" + li_ary[count].a.href;
					var title = li_ary[count].a.content;	
					console.log(title+" : "+href);
					out += '<li><a  href="'+href+'" target="_blank">'+title+'</a></li>' ;
				}
				out += '</ul></div>';
				console.log("/********************************/")
			}		
			$(".tab-content").html(out);
 }
