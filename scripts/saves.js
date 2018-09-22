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