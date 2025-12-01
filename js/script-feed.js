document.querySelectorAll(".comment-count").forEach(el => {
  const id = el.dataset.postId;
  const comments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
  el.textContent = comments.length + " comments";
});
