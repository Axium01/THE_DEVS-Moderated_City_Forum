const KEY = 'postKey';

function readPost() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

function writePost(post) {
  localStorage.setItem(KEY, JSON.stringify(post));
}

function getPostIdFromCookie() {
  const parts = document.cookie.split(";");
  for (let p of parts) {
    p = p.trim();
    if (p.startsWith("post=")) {
      return parseInt(p.split("=")[1]);
    }
  }
  return null;
}

function addComment(postId, text) {
  let posts = readPost();
  let post = posts.find(p => p.id === postId);

  if (!post.comments) post.comments = [];

  post.comments.push({
    text: text,
    date: new Date().toLocaleString()
  });

  writePost(posts);
  render();
}

function render() {
  const postContainer = document.getElementById('mainPostList');
  const posts = readPost();

  const postId = getPostIdFromCookie();
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
        <span class="comment-date">${c.date}</span>
      </div>`;
    });
  } else {
    commentsHTML = `<p class="no-comments">No comments yet.</p>`;
  }

  html = `
    <div class="postBody">

      <h1 class="postTitle">${item.title}</h1>
      <p class="postInfo">${item.user} | ${item.type}</p>
      <p class="fullPostContent">${item.content}</p>
      <p class="postDate">${item.date}</p>

      <div class="comments-section">
        <h3>Comments</h3>
        <div class="comments-list">
          ${commentsHTML}
        </div>

        <form onsubmit="event.preventDefault(); submitComment(${item.id}, this)">
          <input type="text" class="commentInput" placeholder="Add a comment..." required>
          <button type="submit">Post</button>
        </form>
      </div>

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
