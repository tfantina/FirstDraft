function formatting(type) {
  document.execCommand(type);
  document.getElementById("container").focus();
  console.log("executed");

}
