const EndpointChatAPI = "/api/chat"
const EndpointAutoComplete = "/api/autocomplete"

var chatInput = document.querySelector("#chat-input");
var convArea = document.querySelector("#conv-area");
var autoComplete = document.querySelector("#autocomplete");
var chatBlock = document.querySelector("#chat-block");
var inputSection = document.querySelector("#input-section");

inputSection.addEventListener("click", (e) => {
    chatInput.focus();
})

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    sendChat();
    return;
  }
})

chatInput.addEventListener("input", onInputChat);

function onInputChat(e) {
    const content = e.target.value
    if (content == "") {
        updateAutocomplete([]);
        return;
    }
    if (content == " ") {
        chatInput.value = "";
        addChatBlock(" ");
        return;
    }

    const jsonData = {
        "content": content
    };

    fetch(EndpointAutoComplete, {
      method: 'POST',
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        updateAutocomplete(data.available);
    })
    .catch(error => {
      console.error('GOD DAMN IT KRIS WHERE THE HELL ARE WE\nError:', error);
    });
}

function clearChatSection() {
    chatBlock.textContent = "";
    chatInput.value = "";
    updateAutocomplete([]);
}

function updateAutocomplete(available) {
    autoComplete.textContent = "";

    for (let i = 0; i < available.length; i++) {
        el = document.createElement("p");
        el.textContent = available[i];
        el.addEventListener("click", autocompleteClickEvent);

        autoComplete.appendChild(el);
    }
}

function autocompleteClickEvent(e) {
    addChatBlock(e.target.innerText);
    chatInput.value = "";
    updateAutocomplete([]);
}

function addChatBlock(content) {
    el = document.createElement("p");
    el.setAttribute("data", content);
    el.textContent = content;
    if (content == " ") {
        el.innerHTML = "&nbsp;";
        el.style["width"] = "20px";
    }
    chatBlock.appendChild(el);
}

function sendChat() {
    chat = ""

    for (let i = 0; i < chatBlock.children.length; i++) {
        chat = chat.concat(chatBlock.children[i].getAttribute("data"));
    }

    console.log(chat)
    const jsonData = {
      "chat": chat
    };

    fetch(EndpointChatAPI, {
      method: 'POST',
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      onResponse(data)
    })
    .catch(error => {
      console.error('GOD DAMN IT KRIS WHERE THE HELL ARE WE\nError:', error);
    });

    appendChat("user", chat);
    clearChatSection()
}

function onResponse(data) {
    parsed = parseSpecialData(data.answer)
    stringPart = parseSpecialString(data.answer);
    target = parsed.target;
    day = parsed.day;

    chat = data.answer.replace(stringPart, crawlData(target, day));

    appendChat("bot", chat);
}

function appendChat(role, chat) {
    dialog = document.createElement("p");
    dialog.textContent = chat;
    dialog.classList.add("chat")
    dialog.classList.add(role)

    convArea.appendChild(dialog);
}

function crawlData(target, day) {
    return "(이곳에 " + target + "의" + day + "데이터 삽입)";
}

function parseSpecialData(inputString) {
    var regex = /\[([^\]]*)\]\(([^)]*)\)/;
    var match = regex.exec(inputString);

    if (match) {
        return {
            target: match[1],
            day: match[2]
        };
    } else {
        return null;
    }
}

function parseSpecialString(inputString) {
    var regex = /\[(.*?)\]\((.*?)\)/;
    var match = regex.exec(inputString);

    return match ? match[0] : null;
}

