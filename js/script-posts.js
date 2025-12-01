const KEY = 'postKey';
let filterAreaList = [];
let filterTypeList = [];

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

// Post filteration
function filterPost() {
  console.log("Filtering Post");
  filterAreaList = [];
  if (document.forms["filters"]["hpCity"].checked == true) {
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

  filterTypeList = [];
  if (document.forms["filters"]["Question"].checked == true) {
    filterTypeList.push("question");
  }
  if (document.forms["filters"]["News"].checked == true) {
    filterTypeList.push("news");
  }
  if (document.forms["filters"]["Help"].checked == true) {
    filterTypeList.push("help");
  }
  if (document.forms["filters"]["Ad"].checked == true) {
    filterTypeList.push("ad");
  }

  // draftPost.area = document.forms["postForm"]["area"].value;
  render();
}

function render() {
  const postContainer = document.getElementById('mainPostList');
  const posts = readPost();
  


  let html = ``;

  posts.forEach(item => {
    let commentsHTML = "";
    let commentCount = 0;

    if (item.comments && item.comments.length > 0) {
      commentCount = item.comments.length;
    }

    const profile = JSON.parse(localStorage.getItem('profile'));
    let areaLocation = "";
    if (item.areaName == profile[item.area]) {
      areaLocation = "My " + item.area;
    }
    else {
      areaLocation = item.areaName + " " + item.area;
    }

    if (filterAreaList.includes(item.area) == true)
    {
      if (filterTypeList.includes(item.type) == true)
      {
        html += `
      <div class="postBody">
        <button role="link" class="postTitle" onclick="selectPost(${item.id})">${item.title}</button>
        <div class="postInfo"><p>${item.user}</p><p>${areaLocation}</p><p>${item.type}</p></div>
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
