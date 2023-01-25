const signup = async (firstname, lastname, email, password) => {
  console.log(firstname, lastname, email, password);
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
      // alert("signed up successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    } else {
      alert("An error occured. Try again!");
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
