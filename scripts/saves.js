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
  content.execCommand('Copy');
}
