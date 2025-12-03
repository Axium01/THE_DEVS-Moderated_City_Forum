let profile = JSON.parse(localStorage.getItem('profile'));
console.log("Script");
checkPage();

function loadProfile() {
  document.getElementById("idexProfileForm").style.display = "grid";
  document.getElementById("profileCard").style.display = "none";
  if (JSON.parse(localStorage.getItem('profile')) != null)
  {
    document.forms["idexProfileForm"]["firstName"].value = profile.firstName;
    document.forms["idexProfileForm"]["lastName"].value = profile.lastName;
    document.forms["idexProfileForm"]["city"].value = profile.city;
    document.forms["idexProfileForm"]["country"].value = profile.country;
    document.forms["idexProfileForm"]["county"].value = profile.county;
    document.forms["idexProfileForm"]["zip"].value = profile.zip;
    document.forms["idexProfileForm"]["state"].value = profile.state;
    console.log("Load profile");
  }
  else {
    profile = {firstName:"", lastName:"", city:"", country:"", county:"", zip:"", state:""};
    console.log("New profile");
  }
}

function saveProfile()
{
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


function showProfile() {
  document.getElementById("idexProfileForm").style.display = "none";
  document.getElementById("profileCard").style.display = "grid";
  
  console.log(profile);

  document.getElementById("nameP").innerHTML = "" + profile['firstName'] + " " + profile.lastName;
  document.getElementById("cityP").innerHTML = "" + profile.city + " City,";
  document.getElementById("countyP").innerHTML = "" + profile.county  + " County,";
  document.getElementById("stateP").innerHTML = "" + profile.state + ",";
  document.getElementById("countryP").innerHTML = "" + profile.country + ",";
  document.getElementById("zipP").innerHTML = "" + profile.zip;
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
