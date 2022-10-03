
//Require packages
var path = require('path');
var https = require('https');
var seaport =  require('seaport');
var loadbalancer = seaport.connect('localhost', 9090);
var httpProxy = require('http-proxy');
var fs = require('fs');


//Creating a variable for encryption
const options = {
key : fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
cert : fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
secure:false
}


var serverProxy = httpProxy.createProxyServer({secure: false}); 

//Creating the server with encryption
var server = https.createServer(options, function (req, res){
     var portNumber = loadbalancer.query('server');

//If not equal to portnumbers length
     if (!portNumber.length){
         res.writeHead(503,{'Content-type':'text/plain'});
    //we send Full Server in response
        res.end('Full server');
        return;
     }

     //n depreciates with 1 and return whats left equal to portnumbers length
    var n =-1;
    n = (n + 1) % portNumber.length;

    var port = portNumber[n].port;
    //Then split the number and reserve it
    var host = portNumber[n].host.split(":").reverse()[0];

    serverProxy.web(req, res, { target: 'https://' + host + ':' + port });	

})

server.listen(4000, function(){
    console.log('Load balancer listening on port %d', this.address().port)
});
