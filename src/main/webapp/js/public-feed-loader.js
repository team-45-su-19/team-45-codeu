// Fetch messages and add them to the page.
function fetchMessages(){
  const url = '/feed';
  fetch(url).then((response) => {
  return response.json();
}).then((messages) => {
  const messageContainer = document.getElementById('message-container');
  if(messages.length == 0){
    messageContainer.innerHTML = '<p>There are no posts yet.</p>';
  }
  else{
    messageContainer.innerHTML = '';
  }
  messageContainer.appendChild(buildTimeline(messages, false));
});
}

// Fetch data and populate the UI of the page.
function buildUI(){
  fetchMessages();
}