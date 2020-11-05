$(function () {
  // make connection
  let socket = io.connect("http://localhost:3000");

  // buttons and inputs
  const message = $("#message");
  const send_message = $("#message");
  const chatroom = $("#chatroom");
  const feedback = $("feedback");
  const usersList = $("#users-list");
  const nickName = $("#nickname-input");

  // Emit message
  // If send message btn is clicked
  send_message.click(() => {
    socket.emit("new_message", (data) => {
      feedback.html("");
      message.val("");
      // append the new message on the chatroom
      chatroom.append(`
                <div>
                    <div class="box3 sb14">
                        <p style='color:${data.color}' class="chat-text user-nickname">${data.username}</p>
                        <p class="chat-text" style="color: rgba(0,0,0,0.87)">${data.message}</p>
                    </div>
                </div>
            `);
      keepTheChatRoomToTheBottom();
    });
  });

  // Emit a username
  nickName.keypress((e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === "13") {
      socket.emit("change_username", { nickName: nickName.val() });
      socket.on("get users", (data) => {
        const html = "";
        data.map((data) => {
          html += `<li class="list-item" style="color: ${data.color}">${data.username}</li>`;
        });
        usersList.html(html);
      });
    }
  });

  //   Function that keeps the chatbox stick to the bottom
  const keepTheChatRoomToTheBottom = () => {
    const chatroom = document.querySelector("chatroom");
    chatroom.scrollTop = chatroom.scrollHeight - chatroom.clientHeight;
  };

  // Emit typing
  message.bind("keypress", (e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode !== "13") socket.emit("typing");
  });

  //   Listen on typing
  socket.on("typing", (data) => {
    feedback.html("<p><i>" + data.username + " is typing a message...</i></p>");
  });
});
