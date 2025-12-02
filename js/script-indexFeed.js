const KEY = 'postKey';
let filterAreaList = [];

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
  localStorage.setItem("selectedPostID", JSON.stringify(id));
  window.location.href = "js/post.html";
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

// Post filteration
function filterPost() {
  filterAreaList = [];
  if (document.forms["filters"]["city"].checked == true) {
    filterAreaList.push("city");
  }
  if (document.forms["filters"]["county"].checked == true) {
    filterAreaList.push("county");
  }
  if (document.forms["filters"]["state"].checked == true) {
    filterAreaList.push("state");
  }
  if (document.forms["filters"]["country"].checked == true) {
    filterAreaList.push("country");
  }

  render();
}

function render() {
  let postContainer = document.getElementById('questionsSection');
  const posts = readPost();
  const profile = JSON.parse(localStorage.getItem('profile'));
  let areaLocation;
  
  let html = ``;

  posts.forEach(item => {
    let commentsHTML = "";
    let commentCount = 0;

    if (item.comments && item.comments.length > 0) {
      commentCount = item.comments.length;
    }
    
    if (item.areaName == profile[item.area]) {
      
      if (filterAreaList.includes(item.area) == true && item.type == "question")
      {
        areaLocation = item.areaName;
        html += `
        <div class="postBody">
          <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
          <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p></div>
          <p class="postContent">${item.content}</p>
          <p class="postDate">${item.date}    ${commentCount} Comments</p>
          <button class="postDelete" onclick="removePost(${item.id})">x</button>
        </div>
        `;
      }
    }
  });
  postContainer.innerHTML = html;

  // News
  postContainer = document.getElementById('newsSection');
  
  html = ``;

  posts.forEach(item => {
    let commentsHTML = "";
    let commentCount = 0;

    if (item.comments && item.comments.length > 0) {
      commentCount = item.comments.length;
    }
    
    if (item.areaName == profile[item.area]) {
      
      if (filterAreaList.includes(item.area) == true && item.type == "news")
      {
        areaLocation = item.areaName;
        html += `
        <div class="postBody">
          <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
          <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p></div>
          <p class="postContent">${item.content}</p>
          <p class="postDate">${item.date}    ${commentCount} Comments</p>
          <button class="postDelete" onclick="removePost(${item.id})">x</button>
        </div>
        `;
      }
    }
  });
  postContainer.innerHTML = html;


  postContainer = document.getElementById('helpSection');
  
  html = ``;

  posts.forEach(item => {
    let commentsHTML = "";
    let commentCount = 0;

    if (item.comments && item.comments.length > 0) {
      commentCount = item.comments.length;
    }
    
    if (item.areaName == profile[item.area]) {
      
      if (filterAreaList.includes(item.area) == true && item.type == "help")
      {
        areaLocation = item.areaName;
        html += `
        <div class="postBody">
          <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
          <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p></div>
          <p class="postContent">${item.content}</p>
          <p class="postDate">${item.date}    ${commentCount} Comments</p>
          <button class="postDelete" onclick="removePost(${item.id})">x</button>
        </div>
        `;
      }
    }
  });
  postContainer.innerHTML = html;

  postContainer = document.getElementById('adsSection');
  
  html = ``;

  posts.forEach(item => {
    let commentsHTML = "";
    let commentCount = 0;
    if (item.comments && item.comments.length > 0) {
      commentCount = item.comments.length;
    }
    
    if (item.areaName == profile[item.area]) {
      
      if (filterAreaList.includes(item.area) == true && item.type == "ad")
      {
        areaLocation = item.areaName;
        html += `
        <div class="postBody">
          <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
          <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p></div>
          <p class="postContent">${item.content}</p>
          <p class="postDate">${item.date}    ${commentCount} Comments</p>
          <button class="postDelete" onclick="removePost(${item.id})">x</button>
        </div>
        `;
      }
    }
  });
  postContainer.innerHTML = html;
}

function submitComment(postId, form) {
  const input = form.querySelector(".commentInput");
  addComment(postId, input.value);
  input.value = "";
}

filterPost();
