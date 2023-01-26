const signup = async (firstname, lastname, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://bloglite-oxtq.onrender.com/api/auth/signup",
      data: {
        firstname,
        lastname,
        email,
        password,
      },
    });
    if ((res.data.status = "success")) {
      displayAlert("success", "signed up successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    } else {
      displayAlert("error", "An error occured. Try again!");
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".form-group").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signup(firstname, lastname, email, password);
});

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
