const onResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  getAllPosts() {
    return fetch(`${this.baseUrl}/posts`, {
      method: "GET",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  getPostId(id) {
    return fetch(`${this.baseUrl}/posts/${id}`, {
      method: "GET",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  addLike(postId) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: "PUT",
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  deleteLike(postId) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: "DELETE",
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  changePostLike(postId, isLiked) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: isLiked ? "DELETE" : "PUT",
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  addNewPost(post) {
    return fetch(`${this.baseUrl}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  changePost(post, postId) {
    return fetch(`${this.baseUrl}/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  deletePostById(idPost) {
    return fetch(`${this.baseUrl}/posts/${idPost}`, {
      method: "DELETE",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  getPostComments(postId) {
    return fetch(`${this.baseUrl}/posts/comments/${postId}`, {
      method: "GET",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  addNewComments(comments, postId) {
    return fetch(`${this.baseUrl}/posts/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify(comments),
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
  deleteComment(postId, commentId) {
    return fetch(`${this.baseUrl}/posts/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }

  singInUser(user) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    }).then(onResponse);
  }
  singUpUser(user) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    }).then(onResponse);
  }
  getUserInfoById(userId) {
    return fetch(`${this.baseUrl}/users/${userId}`, {
      method: "POST",
      body: JSON.stringify(userId),
      headers: this.headers,
      // authorization: `Bearer ${localStorage.getItem("postApi")}`,
    }).then(onResponse);
  }
}

const config = {
  baseUrl:
    "https://api.react-learning.ru/v2/group-12" ||
    "https://api.react-learning.ru/v2/12",
  baseUsersUrl: `https://api.react-learning.ru/users`,
  headers: {
    "Content-Type": "application/json",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyM2MzMDMyOTFkNzkwYjNmYzk2N2MiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY1MDgwLCJleHAiOjE3MTM2MDEwODB9.podOuWY9CAovzjgr22aT8s3D__ihq20XmXXT06INvUA" ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao",
  },
};

export const api = new Api(config);
