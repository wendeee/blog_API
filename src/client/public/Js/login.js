const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://bloglite-oxtq.onrender.com/api/auth/login",
      // url: "http://localhost:8080/api/auth/login",
      data: {
        email,
        password,
      },
    });

    if ((res.data.status = "success")) {
      console.log("Log in successful");
      displayAlert("success", "Logged in successfully");
      // alert("Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    displayAlert("error", err.response.data.message);
    // alert(err.response.data.message);
  }
};

document.querySelector(".form-group").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  login(email, password);
});

document.querySelector(".banner-div").style.display = "none";

//alert prompt
const hideAlert = async () => {
  const div = document.querySelector(".alert");
  if (div) div.parentElement.removeChild(div);
};
const displayAlert = async (type, message) => {
  hideAlert();
  const alertDiv = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", alertDiv);
  window.setTimeout(hideAlert, 5000);
};
