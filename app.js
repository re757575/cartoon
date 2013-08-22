
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');  


var request = require('request');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
     res.sendfile(__dirname + '/404.html',404);
});
  
app.use(function(error, req, res, next) {
     res.send('500: Internal Server Error', 500);
});
  
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.get('/myjsonp', function (req, res) {

  var url ="";
  
  if(req.query.num == "1"){
     console.log("num=1,青空");
     url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fqingkong.net%2Fanime%2Frenew%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22summary%22%5D'&format=json&diagnostics=true&callback=get";
  }else if(req.query.num == "2"){
      console.log("num=2,dm456");
     url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fwww.dm456.com%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22hotUpdateList%22%5D'&format=json&diagnostics=true&callback=jQuery20208017243463546038_1377156242416&_=1377156242418";
  }else{
     url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20%0Awhere%20url%3D%22http%3A%2F%2Fqingkong.net%2Fanime%2Frenew%2F%22%0Aand%20xpath%3D'%2F%2F*%5B%40class%3D%22summary%22%5D'&format=json&diagnostics=true&callback=get";
  }

  request(url, function(error, response, body) {
        
        var json = body.toString() ;
        
        //get(11111111111111);
        // 去除 get(  &  );
        var front_index = json.indexOf('get')  // 0123
        var end_index = json.indexOf(');')
        
        console.log("front_index = "+front_index);
        console.log("end_index = "+end_index);
         
        var jn = json.substring(front_index+4 , end_index);
        var parsejs = JSON.parse(jn);  
        
        console.log("擷取後:\n"+jn);
        console.log("/****************************************************/");
        
        console.log("JSON.parse後:");
        console.log(parsejs);
        console.log("/****************************************************/");
        
        res.charset = 'utf-8';
        res.contentType('text/javascript');
        res.send(parsejs);
        res.end();  
        
        //res.jsonp(parsejs); 
                 
        /*
        res.header('Content-Type', 'text/javascript');
        res.header('Charset', 'utf-8')  
        res.send(req.query.callback + body); 
         */         
  });  

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
              
                 