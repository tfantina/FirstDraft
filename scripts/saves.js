function save() {
  let turndownService = new TurndownService();
  let markdown = turndownService.turndown(writtingContent);
  let filename = "firstdraft";
  let blob = new Blob([markdown], { type: "text.plain;charset=utf-8"});
  saveAs(blob, filename+".md");
};

function saveHtml(content) {
  let filename = "firstdraft";
  let blob = new Blob([content], { type: "text.html;charset=utf-8"});
  saveAs(blob, filename+".html");
}


function copy(content) {
  let textToCopy = document.createElement('textarea');
  textToCopy.id = 'temp-text';
  textToCopy.style.height = 0;
  document.body.appendChild(textToCopy);
  textToCopy.value = document.getElementById(content).innerText;
  let selector = document.querySelector("#temp-text");
  selector.select();
  document.execCommand("copy");
  document.body.removeChild(textToCopy);



}



window.onbeforeunload = function(e) {
  return "Are you sure?" + e;
};
