/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get('user');

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
  window.location.replace('/');
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
  document.title = 'User Page - ' + parameterUsername;
}

/**
 * Shows the message form if the user is logged in and viewing their own page.
 */
function showMessageFormIfViewingSelf() {

  document.getElementById('about-me-form').classList.remove('hidden');

  fetch('/login-status')
      .then((response) => {
        return response.json();
      })
      .then((loginStatus) => {
        if (loginStatus.isLoggedIn &&
            loginStatus.username == parameterUsername) {
          const messageForm = document.getElementById('message-form');
          messageForm.classList.remove('hidden');
        }
      });
}

/**Fetches About Me information of user**/
function fetchAboutMe(){
  const url = '/about?user=' + parameterUsername;
  fetch(url).then((response) => {
    return response.text();
  }).then((aboutMe) => {
    const aboutMeContainer = document.getElementById('about-me-container');
    if(aboutMe == ''){
      aboutMe = 'This user has not entered any information yet.';
    }

    aboutMeContainer.innerHTML = aboutMe;

  });
}

/**Fetches profile pic of user**/
function fetchProfilePic(){
  const url = '/image-form-handler?user=' + parameterUsername;
  fetch(url).then((response) => {
    return response.text();
  }).then((profilePicUrl) => {
    const profilePicContainer = document.getElementById('profile-pic-container');
    if(profilePicUrl == ''){
      profilePicUrl = 'This user has not uploaded any profile picture.';
    }else{
      profilePicUrl = '<img src=\"' + profilePicUrl + '\" />';
    }

    profilePicContainer.innerHTML = profilePicUrl;

  });
}

/** Fetches messages and add them to the page. */
function fetchMessages() {
  const url = '/messages?user=' + parameterUsername;
  fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((messages) => {
        const messagesContainer = document.getElementById('message-container');
        if (messages.length == 0) {
          messagesContainer.innerHTML = '<p>This user has no posts yet.</p>';
        } else {
          messagesContainer.innerHTML = '';
        }
        messagesContainer.appendChild(buildTimeline(messages));
      });
}

function loadMarkdownEditor() {
  let simplemde = new SimpleMDE({
    autoDownloadFontAwesome: true,
  	autosave: {
  		enabled: true,
  		uniqueId: "message "
  	},
  	element: document.getElementById("message-input"),
  	forceSync: true,
  	status: false
  });
}

/** Fetches Blobstore url then displays form that supports image upload. */
function fetchBlobstoreUrlAndShowForm() {
  fetch('/blobstore-upload-url')
    .then((response) => {
      return response.text();
    })
    .then((imageUploadUrl) => {
      const messageForm = document.getElementById('upload-dp');
      messageForm.action = imageUploadUrl;
      messageForm.classList.remove('hidden');
    });
}

/** Fetches data and populates the UI of the page. */
function buildUI() {
  setPageTitle();
  showMessageFormIfViewingSelf();
  createMapForUserPage();
  fetchMessages();
  fetchAboutMe();
  fetchBlobstoreUrlAndShowForm();
  loadMarkdownEditor();
  fetchProfilePic();
}