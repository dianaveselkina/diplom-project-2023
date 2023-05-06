const onResponse = (res) => {
  return res.json();
};

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
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
}

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-12',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyM2MzMDMyOTFkNzkwYjNmYzk2N2MiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY1MDgwLCJleHAiOjE3MTM2MDEwODB9.podOuWY9CAovzjgr22aT8s3D__ihq20XmXXT06INvUA',
  },
};

export const api = new Api(config);
