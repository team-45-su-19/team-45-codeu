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

function buildMessageInTimeline(message, flip){
  const messageDiv = document.createElement('div');
  messageDiv.classList.add("timeline-panel");

  const imageDiv = document.createElement('div');
  imageDiv.classList.add("timeline-image");

  const image = document.createElement('img');
  image.classList.add("rounded-circle");
  image.classList.add("img-fluid");
  image.src ="/img/default-profile-pic.jpeg";
  image.alt ="";
  imageDiv.appendChild(image);

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('timeline-body');
  timeText = document.createElement('p');
  timeText.classList.add('text-muted');
  timeText.appendChild(document.createTextNode(formatTimestamp(message.timestamp)));
  timeDiv.appendChild(timeText);

  if (message.location_name){
    const locDiv = document.createElement('div');
    locDiv.classList.add('timeline-heading');
    locText = document.createElement('h4');
    locText.appendChild(document.createTextNode(message.location_name));
    locDiv.appendChild(locText);
    messageDiv.appendChild(locDiv);
  }

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('timeline-body');
  bodyDiv.innerHTML = SimpleMDE.prototype.markdown(message.text.replace('&gt;', '>')); // Allow quotes

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