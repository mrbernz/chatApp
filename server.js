// web address
// install http-server
// http://noel.princesspeach.nyc:8080

var Connect = require("ws").Server;
var serverConnect = new Connect({port:3000});
var clients = [];
var history = [];
serverConnect.on("connection",function(ws)
{
  ws.on("message",function(msg)
  {
    var parsed = JSON.parse(msg);
    history.push(parsed);
    var out = [parsed];
    clients.forEach(function(client)
    {
      if (client!==ws)
        {
          client.send(JSON.stringify(out));
        };
    });
      if (ws)
        {
          ws.send(JSON.stringify(out));
        }
    console.log(parsed.name + ": " + parsed.message);
  });
  clients.push(ws);
  ws.on("close",function()
  {
    var ind = clients.indexOf(ws);
    clients.splice(ind,1);
    console.log("client disconnected");
  });
  console.log("client connected");
  ws.send(JSON.stringify(history));
});
