$(function(){
		one();
		$("#one").click(function(){
			$(this).parent().addClass("active");
			$("#two").parent().removeClass("active");
			one();
		});
		$("#two").click(function(){
			$(this).parent().addClass("active");
			$("#one").parent().removeClass("active");
			two();
		});	
	});
	
	function one(){
		console.log("/**************開始擷取青空動漫****************/\n\n");
		$("article").html("");
		$(".loadimg").show();
		 $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fqingkong.net%2Fanime%2Frenew%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22summary%22%5D'&format=json&diagnostics=true&callback=?",Myjsonp)
		 .done(function() { console.log( "解析完畢...." ); })
		 .fail(function() { console.log( "YQL讀取失敗" ); $(".loadimg").hide(); $("article").html("<h1 class=\"text-error\">讀取失敗! 請重試</h1>");});
		 
		 console.log("解析中....");
		 
		 function Myjsonp(data){
				
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
							 season = ary[index].div.div.span[0].content;
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
					console.log("/*******************************************************/\n");
					//console.log(ary[index].div.div.a);
					//console.log(ary[index].div.div.span);
					
				}
				out+= "</ul>"
				$(".loadimg").hide();
				$("article").html(out);
				
		   }		
		}	
		
		function two(){
			console.log("/**************開始擷取dm456****************/\n\n");
			$("article").html("");
			$(".loadimg").show();
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fwww.dm456.com%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22hotUpdateList%22%5D'&format=json&diagnostics=true&callback=?",Myjsonp)
			.done(function() { console.log( "解析完畢...." ); })
			.fail(function() { console.log( "YQL讀取失敗" ); $(".loadimg").hide(); $("article").html("<h1 class=\"text-error\">讀取失敗! 請重試</h1>");});
			
			console.log("解析中....");
			
			 function Myjsonp(data){
				
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
				$(".loadimg").hide();
				$("article").html(out);
			
			 }
		}
