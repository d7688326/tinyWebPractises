var http = require('http');
var url= require('url');
var fs=require('fs');
var Mongo=require('mongodb'),
 db=new Mongo.Db('test',new Mongo.Server('127.0.0.1',27017),{safe:false});


http.createServer(function (req, res) {
  
  var getData=url.parse(req.url,true).query;
  var path=url.parse(req.url,true).pathname;

  if(path==="/"){
  	fs.readFile("./index.html", function(error,data){
  		if(error)
  		{
  			res.writeHead(404,{'Content-Type': 'text/html'});
  			console.log("Error opening file");
  			res.end("file not found");
  		}
  		else
  		{
  			res.writeHead(200,{'Content-Type': 'text/html'});
  			console.log("open sucess");
  			res.end(data);	
  		}
  	});
  }
  if(path==='/mongo')
  {
     db.open(function(err,db){
        if (err) throw err;

        else{
          var collection=db.collection('test');
          collection.find().toArray(callback);
        }
     });

     function callback(err,num){
      if(err) throw err;
      var data = {error:err , results:num};
      console.dir(data);
      db.close();

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data));
     }
  }
}).listen(53123, '127.0.0.1');
console.log('Server running at http://127.0.0.1:53123/');