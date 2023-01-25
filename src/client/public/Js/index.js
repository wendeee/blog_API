const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://bloglite-oxtq.onrender.com/api/auth/logout",
    });
    if ((res.data.status = "success")) {
      alert("Logged out successfully");
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
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
