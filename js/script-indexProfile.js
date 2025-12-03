let profile = JSON.parse(localStorage.getItem('profile'));

function saveProfile() {
  // The user can only make a profile ONCE on the index page, so this shouldn't become an issue... I hope.
  profile = {firstName:"", lastName:"", city:"", country:"", county:"", zip:"", state:""};
  // Get values from input elements
  profile.firstName = document.forms["idexProfileForm"]["firstName"].value;
  profile.lastName = document.forms["idexProfileForm"]["lastName"].value;
  profile.city = document.forms["idexProfileForm"]["city"].value;
  profile.country = document.forms["idexProfileForm"]["country"].value;
  profile.county = document.forms["idexProfileForm"]["county"].value;
  profile.zip = document.forms["idexProfileForm"]["zip"].value;
  profile.state = document.forms["idexProfileForm"]["state"].value;
  console.log(profile);

  // let profile = JSON.parse(localStorage.getItem('profile')); // turn into object
 
  localStorage.setItem('profile', JSON.stringify(profile)); // Save profile by turning into string/JSON
}

// Check to see if it is a new user, and if they are on the homepage or profile page
function checkPage() {
  console.log("Checking page " + window.location.pathname);
  if (profile == null || profile.firstName == "") {
    document.getElementById("createProfile").style.display = "grid";
    document.getElementById("homepageContent").style.display = "none";
    console.log(window.location.pathname);
  }
  else {
    document.getElementById("createProfile").style.display = "none";
    document.getElementById("homepageContent").style.display = "grid";
  }
}

checkPage();
