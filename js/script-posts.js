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
  render();
}

function selectPost(id) {
  document.cookie = "post=" + id + ";path=/";
  window.location.href = "post.html";
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

  let html = ``;

  posts.forEach(item => {
    let commentsHTML = "";

    if (item.comments && item.comments.length > 0) {
      item.comments.forEach(c => {
        commentsHTML += `
          <div class="comment">
            <p>${c.text}</p>
            <span class="comment-date">${c.date}</span>
          </div>
        `;
      });
    } else {
      commentsHTML = `<p class="no-comments">No comments yet.</p>`;
    }

    html += `
      <div class="postBody">
        <div class="r1">
          <button role="link" class="title" onclick="selectPost(${item.id})">
            ${item.title}
          </button>
          <p class="info">${item.user} | ${item.type}</p>
        </div>

        <p class="content">${item.content}</p>
        <p class="date">${item.date}</p>

        <button class="delete" onclick="removePost(${item.id})">x</button>

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
      </div>
    `;
  });

  postContainer.innerHTML = html;
}

function submitComment(postId, form) {
  const input = form.querySelector(".commentInput");
  addComment(postId, input.value);
  input.value = "";
}

render();

