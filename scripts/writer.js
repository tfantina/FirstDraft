/*
allText = everything allText
prevLines = everything except the last line and the current line
lastLine = the last full line the user wrote (ended with enter key or end of line)

*/


let allText = '';
let prevLines;
let lastLine;
let writingMode = true;
const page = document.getElementById("writer");
const blurredPage = document.getElementById("written-blur");
const lastLineBlurredPage = document.getElementById("last-line");
//Starts focus in the "writer id" focus can be regained by clicking in the "content id"
document.addEventListener("DOMContentLoaded", function() {
  page.focus()
});

document.getElementById("container").addEventListener("click", function() {
  page.focus()
});


    //Copy and paste from other sources as plin text
    page.addEventListener("paste", function(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    })

    const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf("CriOS") == -1 && navigator.userAgent.indexOf('FxiOS') == -1;

    //Event listner for keystrokes if the "writer" gets larger than 570 or the user
    //presses enter a new line is started.


    page.addEventListener('keydown', function(event){
      if(event.key === "Enter" || document.getElementById("writer").offsetWidth >= "570") {
        console.log(document.getElementById("writer").offsetWidth);

        //update all text;
        allText = allText + page.innerHTML;
        //put the fresh content into the last line
        lastLine = page.innerHTML;
        //blur the last line
        lastLineBlurredPage.innerHTML = lastLine;
        blurLastLine();
    //    if(isSafari) {
        //  lastLine = lastLine + "</br>"
        //  allText = allText + "</br>"
      //  }


       //look for previous lines
        if(prevLines) {
          blurredPage.innerHTML = prevLines;
          prevLines = prevLines + lastLine;
        } else {
          page.innerHTML;
          prevLines = lastLine;
        }

        console.log("lastLine: " + lastLine);
        console.log("prevLines: " + prevLines);
      //  blurredPage.innerHTML = prevLines ;
      if(writingMode) {
        page.innerHTML = '<br>';
        event.preventDefault();
      }
      }

    });



    //blur every new line written
    function blurLastLine() {
      lastLineBlurredPage.style.webkitFilter = "blur(0px)";
      let totalBlur = 0;
      let timer = setInterval(bluring, 10);
      function bluring() {
        if(totalBlur >= 2.9) {
          clearInterval(bluring);
        } else {
         totalBlur = totalBlur + .1;
         lastLineBlurredPage.style.webkitFilter = "blur(" + totalBlur + "px)";
        }
      }
    }

    //display written content for review

    function showContent() {
      if(writingMode) {
        writingMode = false;
        page.innerHTML = allText ;
        blurredPage.style.display = "none";
        lastLineBlurredPage.style.display = "none";
        document.getElementById("page-layout").style.gridTemplateRows = "60px auto 85px";
        document.getElementById("toggle-writer").innerHTML = "Compose Mode";
        document.getElementById("tools").setAttribute("id", "tools-animate");

      } else {
        page.style.display = "inline";
        blurredPage.style.display = "inline";
        lastLineBlurredPage.style.display = "inline";
        document.getElementById("page-layout").style.gridTemplateRows = "10px auto 85px";
        document.getElementById("toggle-writer").innerHTML = "Review Mode";
        document.getElementById("tools-animate").setAttribute("id", "tools-out");
        document.getElementById("tools-out").setAttribute("id", "tools");
        writingMode = true;

        allText = page.innerHTML;
        lastLineBlurredPage.innerHTML = '';
        blurredPage.innerHTML = allText;
        page.innerHTML = '<br>';
        lastLine = '';
        prevLines = allText;

      }
    };



    function fullScreen() {
      if(document.getElementById("container").webkitRequestFullscreen) {
        document.getElementById("container").webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        document.getElementById("container").mozRequestFullScreen();
      }
    }
