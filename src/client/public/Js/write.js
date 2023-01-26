const createPost = async (title, description, tags, body) => {
  try {
    const res = await axios({
      method: "POST",
      // url:"http://localhost:8080/api/v1/blogs",
      url: "https://bloglite-oxtq.onrender.com/api/v1/blogs",
      data: {
        title,
        description,
        tags,
        body,
      },
    });
    if ((res.data.status = "success")) {
      displayAlert("success", "Post created");
      window.setTimeout(() => {
        location.assign("/me");
      }, 1000);
    }
  } catch (err) {
    displayAlert("error", err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector(".title").value;
  const description = document.querySelector(".description").value;
  const tags = document.querySelector(".tags").value;
  const body = document.querySelector(".body").value;

  createPost(title, description, tags, body);
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
