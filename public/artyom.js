function speak() {
        var artyom = new Artyom();

        artyom.addCommands([
    {
        indexes: ["I'm up"],
        action: function(i){
            document.getElementById("startTimer").click(); 
            artyom.say("Starting morning routine");
            document.getElementById("whitelight").click();
        }
    },
    {
        indexes: ["Start night routine"],
        action: function(i){
            console.log("Bedtime Routine Triggered");
            document.getElementById("lightdown").click();
        }
    },
    {
        indexes: ["turn on the light"],
        action: function(i){
            artyom.say("One second")
            console.log("Turning Light On");
            document.getElementById("lighton").click();
        }
    },
    {
        indexes: ["turn off the light"],
        action: function(i){
            console.log("Turning Light Off");
            artyom.say("Turning off the dam light");
            document.getElementById("lightoff").click();
        }
    },
    {
        indexes: ["Say Hi"],
        action: function(i){
            console.log("Saying Hi");
            artyom.say("Hello, my name is john. I am a virtual asisstant. Currently I can only control lights but soon I will control everything.");
        }
    },
    {
        indexes: ["sunset"],
        action: function(i){
            console.log('Setting the mood');
            artyom.say("Commencing room yellowification");
            document.getElementById("lightdown").click();
        }
    }
]);

window.onload = function(){

    artyom.initialize({
    lang:"en-GB",
    debug:true, // Show what recognizes in the Console
    continuous: true,
    name: "John",
    listen:true, // Start listening after this
    speed:0.9, // Talk a little bit slow
    mode:"normal" // This parameter is not required as it will be normal by default
});
// Or the artisan mode to write less

//artyom.on(["Good morning"]).then(function(i){
  //  console.log("Triggered");
//});
//speak();
}}