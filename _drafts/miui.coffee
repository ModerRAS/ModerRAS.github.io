setTimeout(function () {
  if (localStorage.links == undefined) {
    localStorage.links = [];
  }
  for (i in document.getElementsByTagName("a")) {
    if (localStorage.links.length == 0){
      localStorage.links.push(i.href);
      i.click();
    }
    else {
      var count = 0;
      for (j in localStorage.links){
        if (j == i.href){
          count += 1;
          break;
        }
        else{
          continue;
        }
      if (count == 0){
        localStorage.links.push(i.href);
        i.click();
      }
      }
    }
  }
}
,10000)
