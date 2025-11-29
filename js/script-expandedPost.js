const KEY = 'postKey';

function readPost() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

function writePost(post) {
  localStorage.setItem(KEY, JSON.stringify(post));
}

function removePost(id) {
  let post = readPost();
  post = post.filter(item => item.id !== id);
  writePost(post);
  render(); // rerender so that it actually changes graphically
}

//document.getElementById('deletePost').addEventListener('click', deletePost);

function render() {
  const postContainer = document.getElementById('mainPostList');
  const posts = readPost(); // grab post contents

  // html contains ALL of the stuff in the post table
  let html = ``;

  // POST ITEM DISPLAY //
  posts.forEach((item, i) => {
    let cookie = document.cookie;
    console.log(cookie);

    if (item.id == cookie) {
      console.log("Cookie!");
      const profile = JSON.parse(localStorage.getItem('profile'));
      let location = "";
      if (item.areaName == profile[item.area]) {
        location = item.area
      }
      else {
        location = item.areaName + " " + item.area;
      }

      html += `
      <div class="postBody">
        <h1 class="postTitle">${item.title}</h1>
        <p class"postInfo">${item.user}  ${location}  ${item.type}</p>
        <p class="fullPostContent">${item.content}</p>
        <p class="postDate">${item.date}</p>
        <div class="commentSection"></div>
      </div>`;
    }
    

    

  });
  postContainer.innerHTML = html;
}

    

render();