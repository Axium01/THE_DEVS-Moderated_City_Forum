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

    function selectPost(id) {
      document.cookie = "post=" + id + ";path=/";
      console.log(document.cookie);

      if (document.cookie != null) {
        window.location.href = "post.html"; // Redirect user to the post page
      }
    }

    function render() {
      const postContainer = document.getElementById('mainPostList');
      const posts = readPost(); // grab post contents

      // html contains ALL of the stuff in the post table
      let html = ``;

      // POST ITEM DISPLAY //
      posts.forEach((item, i) => {
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
          <div class="r1">
            <button role="link" class="title" onclick="selectPost(${item.id})">${item.title}</button>
            <p class"info">${item.user}  ${location}  ${item.type}</p>
          </div>
          <p class="content">${item.content}</p>
          <p class="date">${item.date}</p>
		  <p class="comment-count">${item.comments ? item.comments.length : 0} comments</p>
          <button class="delete" onclick="removePost(${item.id})">x</button>
        </div>`;
		  
const postId = 1;

const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

function loadComments() {
  const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
  commentList.innerHTML = "";

  comments.forEach(text => {
    let li = document.createElement("li");
    li.textContent = text;
    commentList.appendChild(li);
  });
}

commentForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const text = commentInput.value.trim();
  if (text === "") return;

  const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
  comments.push(text);

  localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));

  commentInput.value = "";
  loadComments();
});

loadComments();


   



      });
      postContainer.innerHTML = html;
    }
  
    render();
