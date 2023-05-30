const socket = io();

socket.on("messageToChat", (data) => {
  let html = "";
  data?.forEach((message) => {
    html = `${html.length != 0 ? html : ""}
            <li>${message.author}  [${message.timeStamp}]: ${
      message.text
    }</li>`;
  });
  document.getElementById("chat").innerHTML = html;
});

const addMessage = (event, addMessageForm, author) => {
  event.preventDefault();
  console.log({ addMessageForm, author });
};