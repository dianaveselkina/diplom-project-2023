const onResponse = (res) => {
  return res.json();
};

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(onResponse);
  }
  getAllPosts() {
    return fetch(`${this.baseUrl}/posts`, {
      method: 'GET',
      headers: this.headers,
    }).then(onResponse);
  }
  getPostId(id) {
    return fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then(onResponse);
  }
  addLike(postId) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: 'PUT',
    }).then(onResponse);
  }
  deleteLike(postId) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: 'DELETE',
    }).then(onResponse);
  }
  changePostLike(postId, isLiked) {
    return fetch(`${this.baseUrl}/posts/likes/${postId}`, {
      headers: this.headers,
      method: isLiked ? 'DELETE' : 'PUT',
    }).then(onResponse);
  }
}

const config = {
  baseUrl:
    'https://api.react-learning.ru/v2/group-12' ||
    'https://api.react-learning.ru/v2/12',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyM2MzMDMyOTFkNzkwYjNmYzk2N2MiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY1MDgwLCJleHAiOjE3MTM2MDEwODB9.podOuWY9CAovzjgr22aT8s3D__ihq20XmXXT06INvUA' ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao',
  },
};

export const api = new Api(config);
