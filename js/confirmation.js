


function writePostDraft()
{
  const draft = JSON.parse(localStorage.getItem('draftPost'));
  console.log(draft);

  document.getElementById("postTitle").innerHTML = draft.title;
  document.getElementById("postContent").innerHTML = draft.content;

  // console.log(post.title + post.content);
}

// function confirmDraft() {
//   const draft = JSON.parse(localStorage.getItem('draftPost'));
//   let postList = [""];
//   console.log(postList);
//   let postCount = 0;

//   if (postList != null)
//   {
//     postList = JSON.stringify(localStorage.getItem('postList'));
//     console.log(postList);
//     postCount += postList.length;
//     postList[0] = draft;
//   }
//   else {
//     postList = [draft];
//     postList[0] = draft;
//   }



//   localStorage.setItem('postList', JSON.stringify(postList));
//   console.log(JSON.stringify(postList));
//   console.log(postList);
// }

writePostDraft();