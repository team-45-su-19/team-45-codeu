/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message){
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add("left-align");
  usernameDiv.appendChild(document.createTextNode(message.user));

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('right-align');
  timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(usernameDiv);
  headerDiv.appendChild(timeDiv);

  if (message.location_name){
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('message-body');
    locationDiv.appendChild(document.createTextNode(message.location_name));
    headerDiv.appendChild(locationDiv);
  }
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.innerHTML = SimpleMDE.prototype.markdown(message.text.replace('&gt;', '>')); // Allow quotes

  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
}

function formatTimestamp(messageTime){
  var timestamp = new Date(messageTime);
  return timestamp.getFullYear()+"."+timestamp.getMonth()+"."+timestamp.getDate()
          +" "+
          timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds();
}

function createDeleteButton(deleteConfirmationDiv){
  var icon = document.createElement('i');
  icon.classList.add('fa','fa-trash','delete');
  icon.onclick = function(){
    deleteConfirmationDiv.classList.add('show');
    deleteConfirmationDiv.parentNode.classList.add('blur');
  }
  return icon;
}

function createDeleteConfirmationDiv(){
  var div = document.createElement('div');
  div.classList.add('deleteConfirmation','alert','alert-warning');
  var text = document.createTextNode('Are you sure you want to delete this post?');
  var para = document.createElement('p');
  para.appendChild(text);
  div.appendChild(para);
  var yesBtn = document.createElement('button');
  yesBtn.appendChild(document.createTextNode('Yes'));
  var noBtn = document.createElement('button');
  noBtn.appendChild(document.createTextNode('No'));
  noBtn.onclick = function() {
    div.classList.remove("show");
    div.parentNode.classList.remove("blur");
  }
  div.appendChild(noBtn);
  div.appendChild(yesBtn);
  return div;
}


function buildMessageInTimeline(message, flip){
  const imageDiv = document.createElement('div');
  imageDiv.classList.add("timeline-image");

  const image = document.createElement('img');
  image.classList.add("rounded-circle");
  image.classList.add("img-fluid");
  image.src ="/img/products-01.jpg";
  image.alt ="";
  imageDiv.appendChild(image);

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('timeline-heading');
  timeText = document.createElement('h4');
  timeText.appendChild(document.createTextNode(formatTimestamp(message.timestamp)));
  timeDiv.appendChild(timeText);

  nameText = document.createElement('h4');
  nameText.classList.add('subheading');
  nameText.appendChild(document.createTextNode(message.user));
  timeDiv.appendChild(nameText);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('timeline-body');
  bodyDiv.innerHTML = SimpleMDE.prototype.markdown(message.text.replace('&gt;', '>')); // Allow quotes

  const messageDiv = document.createElement('div');
  messageDiv.classList.add("timeline-panel");
  const deleteConfirmationDiv = createDeleteConfirmationDiv();
  messageDiv.appendChild(deleteConfirmationDiv);
  messageDiv.appendChild(createDeleteButton(deleteConfirmationDiv));
  messageDiv.appendChild(timeDiv);
  messageDiv.appendChild(bodyDiv);

  const messageBlock = document.createElement('li');
  if(flip%2 == 1){
    messageBlock.classList.add('timeline-inverted');
  }
  messageBlock.appendChild(imageDiv);
  messageBlock.appendChild(messageDiv);

  return messageBlock;
}

function buildTimeline(messages){
  const timeline = document.createElement('ul');
  timeline.classList.add("timeline");

  //When flip is odd, create "timeline-inverted"
  var flip = 0;
  for (message of messages){
    const messageDiv = buildMessageInTimeline(message, flip);
    timeline.appendChild(messageDiv);
    flip++;
  }
  return timeline;
}