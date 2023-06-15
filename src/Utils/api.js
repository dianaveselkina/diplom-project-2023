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
    }).then(onResponse);
  }

  getAllPosts() {
    return fetch(`${this.baseUrl}/posts`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse);
  }
  getPostById(id) {
    return fetch(`${this.baseUrl}/posts/${id}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse);
  }
  getPaginate(page, number, query = '') {
        return fetch(`${this.baseUrl}/v2/12/posts/paginate?page=${page}&limit=${number}&query=${query}`, {
          method: "GET",
            headers: this.headers,
        }).then(onResponse)
    }

changePostLike(postId, isLikedPost) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: isLikedPost ? "DELETE" : "PUT",
    }).then(onResponse);
  }
  addNewPost(post) {
    return fetch(`${this.baseUrl}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: this.headers,
    }).then(onResponse);
  }
  changePost(post, postId) {
    return fetch(`${this.baseUrl}/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: this.headers,
    }).then(onResponse);
  }
  deletePostById(idPost) {
    return fetch(`${this.baseUrl}/posts/${idPost}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(onResponse);
  }
  getPostComments(postid) {
    return fetch(`${this.baseUrl}/posts/comments/${postid}`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse);
  }
  addNewComments(comments, postId) {
    return fetch(`${this.baseUrl}/posts/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify(comments),
      headers: this.headers,
    }).then(onResponse);
  }
  deleteComments(commentId, postId) {
    return fetch(`${this.baseUrl}/posts/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: this.headers,
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
    }).then(onResponse);
  }
}

const config = {
  baseUrl:
    "https://api.react-learning.ru",
  
  headers: {
    "Content-Type": "application/json",
    authorization:
    `Bearer ${localStorage.getItem('')}` ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyM2MzMDMyOTFkNzkwYjNmYzk2N2MiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY1MDgwLCJleHAiOjE3MTM2MDEwODB9.podOuWY9CAovzjgr22aT8s3D__ihq20XmXXT06INvUA" ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao",
  },
};

export const api = new Api(config);
