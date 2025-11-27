

function writePostDraft()
{
  const post = JSON.parse(localStorage.getItem('draftPost'));
  console.log(post);

  document.getElementById("postTitle").innerHTML = post.title;
  document.getElementById("postContent").innerHTML = post.content;

  // console.log(post.title + post.content);
}

writePostDraft();