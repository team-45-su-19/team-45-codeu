/** Fetches users and adds them to the page. */
function fetchUserList(){
  const url = '/user-list';
  fetch(url).then((response) => {
    return response.json();
  }).then((users) => {
    const list = document.getElementById('list');
    list.innerHTML = '';

    users.forEach((user) => {
      buildUserListItem(user).then((userListItem) => {
        list.appendChild(userListItem);
      })
    });
  });
}

/**
 * Builds a link element that contains a link to a user page, e.g.
 * <a href="/user-page.html?user=test@example.com" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">test@example.com<span class="badge badge-pill badge-secondary">1</span></a>
 */
function buildUserListItem(user){
  const url = '/stats?user='+user;
  return fetch(url).then((response) => {
    return response.json();
  }).then((response) => {
    const countBadge = document.createElement('span');
    countBadge.appendChild(document.createTextNode(response.userMessageCount));
    countBadge.classList.add('badge');
    countBadge.classList.add('badge-pill');
    countBadge.classList.add('badge-secondary');

    const userLink = document.createElement('a');
    userLink.setAttribute('href', '/user-page.html?user=' + user);
    userLink.appendChild(document.createTextNode(user));
    userLink.classList.add('list-group-item');
    userLink.classList.add('list-group-item-action');
    userLink.classList.add('d-flex');
    userLink.classList.add('justify-content-between');
    userLink.classList.add('align-items-center');
    userLink.appendChild(countBadge)
    return userLink;
  });
}

/** Fetches data and populates the UI of the page. */
function buildUI(){
 fetchUserList();
}
