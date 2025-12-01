const KEY = 'postKey';

function readPost() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

function writePost(post) {
  localStorage.setItem(KEY, JSON.stringify(post));
}

function getPostId() {
  const id = JSON.parse(localStorage.getItem("selectedPostID"));
  console.log("Saved ID: " + id);
  return id;
}

function addComment(postId, text) {
  let posts = readPost();
  let post = posts.find(p => p.id === postId);

  if (!post.comments) post.comments = [];
  let profile = JSON.parse(localStorage.getItem('profile'));

  post.comments.push({
    text: text,
    date: new Date().toLocaleString(),
    user: profile.firstName
  });

  writePost(posts);
  render();
}

function render() {
  const postContainer = document.getElementById('mainPostList');
  const posts = readPost();

  const postId = getPostId();
  let html = "";

  const item = posts.find(p => p.id === postId);

  if (!item) {
    postContainer.innerHTML = "<p>Post not found.</p>";
    return;
  }

  let commentsHTML = "";

  if (item.comments && item.comments.length > 0) {
    item.comments.forEach(c => {
      commentsHTML += `
      <div class="comment">
        <p>${c.text}</p>
        <span class="comment-date">${c.user} ${c.date}</span>
      </div>`;
    });
  } else {
    commentsHTML = `<p class="no-comments">No comments yet.</p>`;
  }

  const profile = JSON.parse(localStorage.getItem('profile'));
  let areaLocation = "";
  if (item.areaName == profile[item.area]) {
    areaLocation = "My " + item.area;
  }
  else {
    areaLocation = item.areaName + " " + item.area;
  }

  html = `
    <div class="postBody">
      <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
      <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p><p>${item.type}</p></div>
      <p class="postContentExpanded">${item.content}</p>
      <p class="postDate">${item.date}</p>
    </div>
      

    <div class="comments-section">
      <h4>Comments</h4>

      <div class="comments-list">
        ${commentsHTML}
      </div>

      <form onsubmit="event.preventDefault(); submitComment(${item.id}, this)">
        <input type="text" class="commentInput" placeholder="Write a comment..." required>
        <button type="submit">Post</button>
      </form>
    </div>

  `;

  postContainer.innerHTML = html;
}

function submitComment(postId, form) {
  const input = form.querySelector(".commentInput");
  addComment(postId, input.value);
  input.value = "";
}

render();
