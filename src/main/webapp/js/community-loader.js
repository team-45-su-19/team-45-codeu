/** Fetches users and adds them to the page. */
function fetchUserList(){
  const url = '/user-list';
  fetch(url).then((response) => {
    return response.json();
  }).then((users) => {
    const list = document.getElementById('list');
    list.innerHTML = '';

    users.forEach((user) => {
      const userListItem = buildUserListItem(user);
      list.appendChild(userListItem);
    });
  });
}

/**
 * Builds a link element that contains a link to a user page, e.g.
 * <a href="/user-page.html?user=test@example.com" class="list-group-item list-group-item-action justify-content-between align-items-center">test@example.com</a>
 */
function buildUserListItem(user){
  const userLink = document.createElement('a');
  userLink.setAttribute('href', '/user-page.html?user=' + user);
  userLink.appendChild(document.createTextNode(user));
  userLink.classList.add('list-group-item');
  userLink.classList.add('list-group-item-action');
  userLink.classList.add('justify-content-between');
  userLink.classList.add('align-items-center');

  return userLink;
}

/** Fetches data and populates the UI of the page. */
function buildUI(){
 fetchUserList();
}
