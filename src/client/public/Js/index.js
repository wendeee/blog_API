const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      // url: 'http://localhost:8080/api/auth/logout',
      url: "https://bloglite-oxtq.onrender.com/api/auth/logout",
    });
    if ((res.data.status = "success")) {
      displayAlert("success", "Logged out successfully");
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
    displayAlert("error", err.response.data.message);
  }
};

const logoutBtn = document.querySelector(".log-out");

if (logoutBtn)
  logoutBtn.addEventListener("click", () => {
    logout();
  });

const getAPost = async () => {
  await axios({
    method: "GET",
    url: `https://bloglite-oxtq.onrender.com/api/v1/blogs/${URL}`,
  });
  location.assign(`/posts/${URL}`);
};
let URL;
function getUrl() {
  const href = document.querySelector("#title-href").getAttribute("href");
  URL = href.split("/")[2];
}

document.querySelector(".title").addEventListener("click", (e) => {
  e.preventDefault();
  getUrl();
  getAPost();
});

//alert
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
