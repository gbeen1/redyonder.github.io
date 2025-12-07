/*
FLOW
1. get users information
2. check validation
3. if user validation failed, disable click function in submit button
4. if user validation succeeded, move to main page
5. if user click the reset password button, move to reset page
*/


//updated validation using CHATGPT || updated all by Malik Kistodial
//fine references in ai tool document

// 1. catch the login info variables
const loginId = document.getElementById("username");
const loginPw = document.getElementById("password");
const loginBtn = document.getElementById("btnLogin");
const forgotPasswordLink = document.getElementById("forgotPassword");

// (old helper functions left here in case you still need them elsewhere)
function valid() {
  if (loginId.value.trim() === "" || loginPw.value.trim() === "") {
    alert("Please enter both username and password.");
    return false;
  }
  return true;
}

function moveToMain() {
  location.replace("./index.html");
}

function moveToReset() {
  location.replace("");
}

// ===== USER STORAGE HELPERS =====
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// small helper for the red popup message (login + register reuse this)
function showPopup(message) {
  const popup = document.getElementById("loginErrorPopup");
  if (!popup) return;

  popup.textContent = message;
  popup.style.display = "block";

  // hide after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// ===== LOGIN =====
document.getElementById("btnLogin").addEventListener("click", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // if nothing (or one field) is entered – do NOT log in, just show message
  if (!username || !password) {
    showPopup("Invalid username and password.");
    return;
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // show real name if we have it, otherwise fall back to username
    const displayName = user.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : user.username;

    localStorage.setItem("loggedInUser", displayName);
    location.replace("index.html"); // go straight to NCR home
  } else {
    showPopup("Invalid username or password.");
  }
});

// ===== REGISTRATION =====
const registerForm = document.querySelector("#registerForm form");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showPopup("Passwords do not match.");
    return;
  }

  let users = getUsers();
  if (users.find((u) => u.username === username)) {
    // username already exists – show popup, do NOT alert
    showPopup("Username already exists.");
    return;
  }

  const newUser = {
    firstName,
    lastName,
    phone,
    email,
    username,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  // auto-login new user and send straight to NCR home // updated by malik... when user logs in. Their details is stored
  const displayName = `${firstName} ${lastName}`.trim() || username;
  localStorage.setItem("loggedInUser", displayName);
  location.replace("index.html");
});
