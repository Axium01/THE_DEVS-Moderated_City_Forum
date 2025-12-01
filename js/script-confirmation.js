let containsBannedWords = false;
let containsUnrecommendedWords = false;
let draft = JSON.parse(localStorage.getItem('draftPost'));

const bannedWords = ["swearword"];
const unrecommendedWords = ["hate", "kill", "stupid", "useless"]

document.getElementById("success").style.display = "none";
document.getElementById("banned").style.display = "none";
document.getElementById("advice").style.display = "none";
document.getElementById("postSummary").style.display = "grid";


const successDiv = document.getElementById("success");
// const bannedDiv = document.getElementById("banned");
// const successDiv = document.getElementById("success");

function filterDraft() {
  // Go through title
  let tempWord = "";
  let draftTitle = draft.title;
  let draftContent = draft.content;
  let beginingOfWord = 0;
  containsBannedWords = false;
  containsUnrecommendedWords = false;


  // Banned words
  for ( i = 0; i < bannedWords.length; i++) {

    let wordStart = draftTitle.indexOf(bannedWords[i]);


    if (wordStart != -1) {
      containsBannedWords = true;
      tempWord = RegExp(bannedWords[i], 'gi');
      draftTitle = draftTitle.replace(tempWord, `<span class='banned' title="Restricted word">${bannedWords[i]}</span>`);
      draftTitle = draftTitle.replaceAll(tempWord, `<span class='banned' title="Restricted word">${bannedWords[i]}</span>`);
      draft.title = draftTitle;
    }
  }
  
  // unrecommened words
  for ( i = 0; i < unrecommendedWords.length; i++) {
    let wordStart = draftTitle.indexOf(unrecommendedWords[i]);

    if (wordStart != -1) {
      containsUnrecommendedWords = true;
      tempWord = RegExp(unrecommendedWords[i], 'gi');
      draftTitle = draftTitle.replace(tempWord, `<span class="unrecommended" title="Unrecommended word">${unrecommendedWords[i]}</span>`);
      draftTitle = draftTitle.replaceAll(tempWord, `<span class="unrecommended" title="Unrecommended word">${unrecommendedWords[i]}</span>`);
      draft.title = draftTitle;
    }
  }


  // Content
   // Banned words
  for ( i = 0; i < bannedWords.length; i++) {
    let wordStart = draftContent.indexOf(bannedWords[i]);
    if (wordStart != -1) {
      containsBannedWords = true;
      
      tempWord = RegExp(bannedWords[i], 'gi');
      draftContent = draftContent.replace(tempWord, `<span class='banned 'title="Restricted word">${bannedWords[i]}</span>`);
      draftContent = draftContent.replaceAll(tempWord, `<span class='banned' title="Restricted word">${bannedWords[i]}</span>`);
      draft.content = draftContent;
    }
  }
  
  // unrecommened words
  for ( i = 0; i < unrecommendedWords.length; i++) {
    let wordStart = draftContent.indexOf(unrecommendedWords[i]);

    if (wordStart != -1) {
      containsUnrecommendedWords = true;
      
      tempWord = RegExp(unrecommendedWords[i], 'gi');
      draftContent = draftContent.replace(tempWord, `<span class="unrecommended" title="Unrecommended word">${unrecommendedWords[i]}</span>`);
      draftContent = draftContent.replaceAll(tempWord, `<span class="unrecommended" title="Unrecommended word">${unrecommendedWords[i]}</span>`);
      draft.content = draftContent;
    }
  }

}




function writePostDraft()
{
  filterDraft();
  if (containsBannedWords == true) { // if there are restricted words require user to rewrite post
    console.log("Forced rewrite");
    document.getElementById("banned").style.display = "grid";
    document.getElementById("createPost").style.visibility = "hidden";
  }
  else if (containsBannedWords == false && containsUnrecommendedWords == true) { // Allow user to rewirte their posts or submit
    console.log("Recommended rewrite");
    document.getElementById("advice").style.display = "grid";

  }
  else {
    console.log("No rewrite");

    document.getElementById("success").style.display = "grid";

    console.log(draft);

    
  }
  document.getElementById("postTitle").innerHTML = draft.title;
  document.getElementById("postContent").innerHTML = draft.content;

  document.getElementById("user").innerHTML = draft.user;
  document.getElementById("location").innerHTML = draft.area;
  document.getElementById("type").innerHTML = draft.type;

  // console.log(post.title + post.content);
}



writePostDraft();