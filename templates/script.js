const chatAPI = "/api/chat"

var chatForm = document.querySelector("#chatform");
var chatInput = document.querySelector("#chatinput");
var convArea = document.querySelector("#convArea");

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    sendChat();
    return;
  }
})

function sendChat() {
    chat = chatinput.value;
    if(chat == '') return;
    chatinput.value = "";

    fetch(chatAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "chat": chat
      })
    })
    .then(response => response.json())
    .then(data => {
        onResponse(data);
    })
    .catch(error => {
      console.error("스스로 불러온 재앙에 짓눌려");
    })

    appendChat("user", chat);
}

function onResponse(data) {
    appendChat("bot", data.answer);
}

function appendChat(role, chat) {
    dialog = document.createElement("p");
    dialog.textContent = chat;
    dialog.setAttribute("class", role);
    convArea.appendChild(dialog);
}