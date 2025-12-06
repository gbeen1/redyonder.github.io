/*
FLOW
1. get users information
2. check validation
3. if user validation failed, disable click function in submit button
4. if user validation succeeded, move to main page
5. if user click the reset password button, move to reset page
*/

// 1. catch the login info variables
const loginId = document.getElementById("username");
const loginPw = document.getElementById("password");
const loginBtn = document.getElementById("btnLogin");
const forgotPasswordLink = document.getElementById("forgotPassword");

// 2. user valication -> 3. make to edit user info
//By David
function valid() {
  if (loginId.value.trim() === "" || loginPw.value.trim() === "") {
    alert("Please enter both username and password.");
    return false;
  }
  return true;
}

// 4. move to mainpage
function moveToMain() {
  location.replace("./index.html");
}

// 5. move to resetpage <- implement yet
function moveToReset() {
  location.replace("");
}

//loginBtn.addEventlistener('click', moveToMain); <- implement yet
