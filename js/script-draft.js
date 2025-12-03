let draftPost;
let draftKey;


// Check to see if user has an old saved draft
function loadPastDraft() {
  draftPost = JSON.parse(localStorage.getItem('draftPost'));
  if (draftPost != null)
  {
    console.log(draftPost.title);
    draftPost = JSON.parse(localStorage.getItem('draftPost'));
    document.forms["postForm"]["title"].value = draftPost["title"];
    document.forms["postForm"]["content"].value = draftPost["content"];

    console.log("Load draft");
  }
  else {
    draftPost = {title:"", content:"", area:"", areaName:"", type:"", user:""};
    console.log("New draft");
  }
}


// UNUSED Save draft button code
function saveDraft() {
  draftPost.title = document.forms["postForm"]["title"].value;
  draftPost.content = document.forms["postForm"]["content"].value;
  draftPost.area = document.forms["postForm"]["area"].value;
  draftPost.type = document.forms["postForm"]["type"].value;
  console.log("Post title: " + draftPost.title);

  localStorage.setItem('draftPost', JSON.stringify(draftPost));
}


function readDraft() {
  // Get text from the title and content input text and text area boxes
  draftPost.title = document.forms["postForm"]["title"].value;
  draftPost.content = document.forms["postForm"]["content"].value;
  draftPost.type = document.forms["postForm"]["type"].value;
  draftPost.area = document.forms["postForm"]["area"].value;
  
  let tempArea = document.forms["postForm"]["area"].value;
  let profile = JSON.parse(localStorage.getItem('profile'));
  if (profile == null) {
    console.log("NO PROFILE");
    alert("Please make a profile before posting!")
  }
  
  draftPost.areaName = profile[tempArea];
  draftPost.user = profile.firstName;

  console.log("Posts location is: " + draftPost.areaName);


  // let post = JSON.parse(localStorage.getItem('draftPost')); // turn into object
 
  localStorage.setItem('draftPost', JSON.stringify(draftPost)); // Save post draft by turning into string/JSON

  console.log(draftPost);

  window.location.href = "confirmation.html"; // Redirect user to the form confirmation page
 
}


loadPastDraft();
