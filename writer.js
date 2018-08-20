
var initialState = true;
var writtingContent;
var writingMode = true;
let writerId = document.getElementById("writer");
let blurId = document.getElementById("written-blur");
//Starts focus in the "writer id" focus can be regained by clicking in the "content id"
document.addEventListener("DOMContentLoaded", function() {
  writerId.focus()
});

  document.getElementById("container").addEventListener("click", function() {
    writerId.focus()});


    //Copy and paste from other sources as plin text
    writerId.addEventListener("paste", function(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    })

    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf("CriOS") == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
    console.log(isSafari);

    //Event listner for keystrokes if the "writer" gets larger than 570 or the user
    //presses enter a new line is started.
    writerId.addEventListener('keydown', function(event){


      if(event.key === "Enter" || document.getElementById("writer").offsetWidth >= "570") {

        if(initialState === true) {

          writtingContent = writerId.innerHTML;
          if(isSafari) {
            writtingContent = writtingContent + "</br>";

          }
          blurId.innerHTML = writtingContent ;
          writerId.innerHTML = "";
          initialState = false;
        } else {
          writtingContent = writtingContent + writerId.innerHTML;
          if(isSafari) {
            writtingContent = writtingContent + "</br>";

          }
          blurId.innerHTML = writtingContent ;
          writerId.innerHTML = "";
        }

      }

    });

    //display written content for review

    function showContent() {
      if(writingMode == true) {
        if (initialState === true) {
          writtingContent = writerId.innerHTML;
        } else {
          writtingContent = writtingContent + writerId.innerHTML;
        }
        blurId.innerHTML = writtingContent ;
        writerId.style.display = "none";
        blurId.style.filter = "blur(0px)";
        blurId.contentEditable = "true" ;
        document.getElementById("toggle-writer").innerHTML = "Compose Mode";
        document.getElementById("tools").setAttribute("id", "tools-animate");

        writingMode = false;
      } else {
        writerId.style.display = "inline";
        blurId.style.filter = "blur(2.9px)";
        document.getElementById("toggle-writer").innerHTML = "Review Mode";
        document.getElementById("tools-animate").setAttribute("id", "tools-out");
        document.getElementById("tools-out").setAttribute("id", "tools");
        blurId.contentEditable = "false" ;
        writingMode = true;
        writtingContent = blurId.innerHTML;
        blurId.innerHTML = writtingContent;
      }
    };


    function fullScreen() {
      if(document.getElementById("container").webkitRequestFullscreen) {
        document.getElementById("container").webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        document.getElementById("container").mozRequestFullScreen();
      }
    }

    function save() {
      let turndownService = new TurndownService();
      let markdown = turndownService.turndown(writtingContent);
      let filename = "firstdraft";
      let blob = new Blob([markdown], { type: "text.plain;charset=utf-8"});
      saveAs(blob, filename+".md");
    };

    function savehtml() {
      let filename = "firstdraft";
      let blob = new Blob([writtingContent], { type: "text.html;charset=utf-8"});
      saveAs(blob, filename+".rtf");
    }
  
