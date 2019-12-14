const cont = document.getElementById("content");
const send = document.getElementById("send");
const list = document.getElementById("list");

send.addEventListener("click", function(e) {
  e.preventDefault();
  let str = cont.value;
  // 發出請求
  let xhr = new XMLHttpRequest();
  xhr.open("post", "/addTodo");
  xhr.setRequestHeader("Content-Type", "application/json");
  let todo = JSON.stringify({ content: str });
  xhr.send(todo);
  xhr.onload = function() {
    let res = JSON.parse(xhr.responseText);
    // console.log(res);
    if (!res.success) {
      alert("新增失敗");
      return;
    }
    let resData = res.data;
    let str = "";
    for (i in resData) {
      str += `<li>${resData[i].content}</li>`;
    }
    list.innerHTML = str;
  };
});
