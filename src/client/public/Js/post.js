const editPost = document.querySelector(".edit-post");
const title = document.querySelector(".post-title");
const body = document.querySelector(".post-content");
const description = document.querySelector(".description");
const savePost = document.querySelector(".save-post");
const publishPost = document.querySelector(".publish-post");
const deletePost = document.querySelector(".delete-post");
let likeCount = document.querySelector(".like-count").value;
const wrapper = document.querySelector(".post-header");

const getAPost = async () => {
  const res = await axios({
    method: "GET",
    // url: `http://localhost:8080/api/v1/author/blogs/${
    //   window.location.href.split("/")[4]}`,
    url: `https://bloglite-oxtq.onrender.com/api/v1/author/blogs/${
      window.location.href.split("/")[4]
    }`,
  });
  const postData = res.data.post;

  createPostDiv(postData, ".post-header");
};
getAPost();

function createPostDiv(data, postClass) {
  const container = document.querySelector(postClass);

  let createdAt = new Date(data.createdAt).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let card = `<h1 class="title post-title" >${data.title}</h1>
      <p class="description post-desc" >${data.description}</p>
      <div class="post-details post-div">
        <div >
          <p style="font-weight: bold" class="">
            <span id="author">Written by:</span>
            <span id="author-name">${data.author}</span>
          </p>
        </div>
        <div>
          <p>
            ${createdAt}
          </p>
        </div>
        <div><p>${data.readingTime} read</p></div>
        <div>
          <p>category: <span class="post-tag"> ${data.tags} </span></p>
        </div>
        <div><p>views: ${data.readCount}</p></div>
      </div>`;

  container.innerHTML += card;
}

const editAndSaveChanges = async (title, description, body) => {
  try {
    await axios({
      method: "PUT",
      // url: `http://localhost:8080/api/v1/blogs/${
      //   window.location.href.split("/")[4]
      // }`,
      url: `https://bloglite-oxtq.onrender.com/api/v1/blogs/${
        window.location.href.split("/")[4]
      }`,
      data: {
        title,
        description,
        body,
      },
    });
    if ((res.data.status = "success"))
      displayAlert("success", "Changes saved!");
  } catch (err) {
    if ((err.response.data.status = "Fail")) {
      displayAlert("error", "Unauthorized!");
    }
  }
};

const delPost = async () => {
  const res = await axios({
    method: "DELETE",
    // url: `http://localhost:8080/api/v1/blogs/${
    //   window.location.href.split("/")[4]
    // }`,
    url: `https://bloglite-oxtq.onrender.com/api/v1/blogs/${
      window.location.href.split("/")[4]
    }`,
  });
  if ((res.data.status = "success")) {
    displayAlert("success", "Post deleted!🎃");
    window.setTimeout(() => {
      location.assign("/me");
    }, 1000);
  }
};

const likePost = async (likeCount) => {
  const res = await axios({
    method: "PATCH",
    // url: `http://localhost:8080/api/v1/blogs/${
    //   window.location.href.split("/")[4]
    // }/like`,
    url: `https://bloglite-oxtq.onrender.com/api/v1/blogs/${
      window.location.href.split("/")[4]
    }/like`,
  });
  likeCount += res.data.post.likes;
};

const publish = async () => {
  const res = await axios({
    method: "PATCH",
    // url: `http://localhost:8080/api/v1/blogs/${
    //   window.location.href.split("/")[4]
    // }`,
    url: `https://bloglite-oxtq.onrender.com/api/v1/blogs/${
      window.location.href.split("/")[4]
    }`,
    data: { state: "published" },
  });

  if ((res.data.status = "success")) {
    displayAlert("success", "Published🎉");
    window.setTimeout(() => {
      location.assign("/");
    }, 1500);
  }
};

if (editPost)
  editPost.addEventListener("click", () => {
    wrapper.children[0].contentEditable = true;
    wrapper.children[1].contentEditable = true;
    body.contentEditable = true;
    wrapper.children[0].style.backgroundColor = "#dddbdb";
  });

if (savePost)
  savePost.addEventListener("click", () => {
    wrapper.children[0].contentEditable = false;
    wrapper.children[1].contentEditable = false;
    body.contentEditable = false;
    publishPost.style.display = "flex";
    let titleVal = wrapper.children[0].innerHTML;
    let desVal = wrapper.children[1].innerHTML;
    let bodyVal = body.innerHTML;

    editAndSaveChanges(titleVal, desVal, bodyVal);
  });

if (publishPost)
  publishPost.addEventListener("click", (e) => {
    e.preventDefault();
    publish();
  });

if (deletePost)
  deletePost.addEventListener("click", (e) => {
    e.preventDefault();
    delPost();
  });

document.querySelector(".like").addEventListener("click", (e) => {
  e.preventDefault();
  likePost(likeCount);
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
