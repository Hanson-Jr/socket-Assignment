

const socket = io()

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  sendMessage()
});

function sendMessage(){
  if (messageInput.value === '') return

  const data = {
    message: messageInput.value,
    dateTime: new Date(),
    name: "User"
  };

socket.emit('message', data)
addMessageToUI(true, data);
  messageInput.value = '';
}

socket.on('message', (msg)=>{
  console.log(msg)
  addMessageToUI(false, msg);
})




function addMessageToUI(isOwnMessage, data){

  const element = `
         <li class="${isOwnMessage ? "message-right" : "message-left"}">
         <p class="message">
     ${data.message}
      


               
  </p>
</li>

`
messageContainer.innerHTML += element
scrollToBottom()
}

function scrollToBottom(){
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}



