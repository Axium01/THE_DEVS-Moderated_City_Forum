let profile = JSON.parse(localStorage.getItem('profile'));

function loadProfile() {
  document.getElementById("profileForm").style.display = "grid";
  document.getElementById("profileCard").style.display = "none";
  if (JSON.parse(localStorage.getItem('profile')) != null)
  {
    document.forms["profileForm"]["firstName"].value = profile.firstName;
    document.forms["profileForm"]["lastName"].value = profile.lastName;
    document.forms["profileForm"]["city"].value = profile.city;
    document.forms["profileForm"]["country"].value = profile.country;
    document.forms["profileForm"]["county"].value = profile.county;
    document.forms["profileForm"]["zip"].value = profile.zip;
    document.forms["profileForm"]["state"].value = profile.state;
    console.log("Load profile");
  }
  else {
    profile = {firstName:"", lastName:"", city:"", country:"", county:"", zip:"", state:""};
    console.log("New profile");
  }
}

function saveProfile()
{
  // Get values from input elements
  profile.firstName = document.forms["profileForm"]["firstName"].value;
  profile.lastName = document.forms["profileForm"]["lastName"].value;
  profile.city = document.forms["profileForm"]["city"].value;
  profile.country = document.forms["profileForm"]["country"].value;
  profile.county = document.forms["profileForm"]["county"].value;
  profile.zip = document.forms["profileForm"]["zip"].value;
  profile.state = document.forms["profileForm"]["state"].value;
  console.log(profile);

  // let profile = JSON.parse(localStorage.getItem('profile')); // turn into object
 
  localStorage.setItem('profile', JSON.stringify(profile)); // Save profile by turning into string/JSON
}


function showProfile() {
  document.getElementById("profileForm").style.display = "none";
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
  if (window.location.pathname == "/index.html") {
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
  else if (window.location.pathname == "/html/profile.html"){
    console.log(profile["firstName"]);
    if (profile != null) {
      showProfile();
    }
    else {
      loadProfile();
    }
    console.log(window.location.pathname);
  }
}


checkPage();