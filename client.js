// client side
// ws://noel.princesspeach.nyc:3000

// Create a textbox and a submit button on a html page.
var name;
var div;
var textbox;
var button;

var firstPage = function()
{
  name = "Anonymous";
  document.body.setAttribute("class","body1");
  div = document.createElement("div");
  div.setAttribute("class","div1");
  textbox = document.createElement("input");
  textbox.setAttribute("type","text");
  textbox.setAttribute("id","text");
  textbox.setAttribute("placeholder","Enter your name");
  button = document.createElement("button");
  button.innerText = "Submit";
  button.setAttribute("id","button");
  document.body.appendChild(div);
  div.appendChild(textbox);
  div.appendChild(button);
}
// store inputted name in variable name and replace with a new page when pressing enter
var pressEnter = function()
{
  textbox.addEventListener("keydown",function(enter)
  {
    if (enter.keyCode===13 && textbox.value!=="")
    {
      name = document.getElementById("text").value;
      newPage();
    }
  });
}
// store inputted name in variable name and replace with a new page when pressing the Submit button
var buttonSubmit = function()
{
  button.addEventListener("click",function()
  {
    if (textbox.value!=="")
    {
      name = document.getElementById("text").value;
      newPage();
    }
  });
};
var div2;
var div3;
var textbox2;
var button2;

var newPage = function()
{
  document.body.innerHTML ="";
  document.body.setAttribute("class","body2");
  div2 = document.createElement("div");
  div2.setAttribute("class","div2");
  div3 = document.createElement("div");
  div3.setAttribute("class","div3");
  button2 = document.createElement("button");
  button2.innerText = "Submit";
  button2.setAttribute("id","button2");
  textbox2 = document.createElement("input");
  textbox2.setAttribute("type","text");
  textbox2.setAttribute("id","text2");
  textbox2.setAttribute("placeholder","Enter Message");
  document.body.appendChild(div2);
  document.body.appendChild(div3);
  div3.appendChild(textbox2);
  div3.appendChild(button2);

  //send to the server when there is a message and enter key is pressed
  textbox2.addEventListener("keydown",function(enter)
  {
    if (enter.keyCode===13 && textbox2.value!=="")
    {
      var msghash =
      {
        name:name,
        message:document.getElementById("text2").value
      };
      var msgstrng = JSON.stringify(msghash);
      ws.send(msgstrng);
      textbox2.value ="";
    }
  });

  //send a message to the server when you press submit
  button2.addEventListener("click",function()
  {
    if (textbox2.value!=="")
    {
      var msghash =
      {
        name:name,
        message:document.getElementById("text2").value
      };
      var msgstrng = JSON.stringify(msghash);
      ws.send(msgstrng);
      textbox2.value ="";
    }
  });

  var ws = new WebSocket("ws://localhost:3000");
  ws.addEventListener("message", function(message)
  {
    var parsedmsg = JSON.parse(message.data);
    parsedmsg.forEach(function(parse)
    {
      var newmsg = parse.name + ": " + parse.message;
      var comment2 = document.createElement("p");
      comment2.setAttribute("id","chatbox");
      div2.appendChild(comment2);
      comment2.innerHTML = newmsg;
      console.log(newmsg);
    })
  });
}

firstPage();
pressEnter();
buttonSubmit();
