document.querySelector(".banner-div").style.display = "none";

//function that makes API call to get posts by user
const getPosts = async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:8080/api/v1/author/blogs",
  });

  const allPosts = res.data.posts;

  //loop through posts and populate 'card-div' with post data
  allPosts.forEach((post) => {
    createDivForPost(post, ".card-div");
  });
};
//create div template
function createDivForPost(data, id) {
  const container = document.querySelector(id);
  let card = `<div class='post-card'>
            <div class="post-title post-title-author"><a href="/posts/${
              data._id
            }">${data.title}</a></div>
            <div class="post-body">${data.body.substring(0, 200)}....</div>
            <div class="post-state">${data.state}</div>
    </div>
    <hr>`;
  container.innerHTML += card;
}

getPosts();
