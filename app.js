
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup',showUsers);

function showUsers(e) {

  const user = e.target.value;

  const width = document.body.clientWidth;

if(width >= 2560){
  user.style.fontSize = '1.5rem';
}

  const xhr = new XMLHttpRequest();

  xhr.open('GET',`https://api.github.com/users/${user}`,true)

  xhr.onload = function() {
    const users = JSON.parse(this.responseText);

    if(this.status == 200) {
      let output = '';

      output += `
      <div class="profile-image">
    <img src="${users.avatar_url}" alt="">
    </div>
    <div class="view-profile-btn">
      <a href="${users.html_url}">View Profile</a>
    </div>
    <div class="badges">
      <div class="badge-1">Public Repos: ${users.public_repos}</div>
      <div class="badge-2">Public Gists: ${users.public_gists}</div>
      <div class="badge-3">Followers: ${users.followers}</div>
      <div class="badge-4">Following: ${users.following}</div>
    </div>
    <div class="list-items">
      <ul>
        <li>Company: ${users.company}</li>
        <li>Blog: ${users.blog}</li>
        <li>Location: ${users.location}</li>
        <li>Member Since: ${users.created_at}</li>
      </ul>
    </div>
      `;
    document.querySelector('.card-body').innerHTML = output;  
    } else if(user === ''){
        document.querySelector('.card-body').innerHTML = '';
    } else {
      document.querySelector('.card-body').innerHTML = `
      <div class="alert">No Matches</div>
      `
    }
  }

  xhr.send();
}

