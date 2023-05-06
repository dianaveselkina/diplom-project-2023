// const onResponce = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// };

// class Api {
//   constructor({ baseUrl, basePostsUrl, baseUserUrl, token }) {
//     this._token = `Bearer ${token}`;
//     this._baseUrl = baseUrl;
//     this._basePostsUrl = basePostsUrl;
//     this.baseUserUrl = baseUserUrl;
//   }

//   singIn(user) {
//     return fetch('https://api.react-learning.ru/signin', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     }).then(onResponce);
//   }

//   singUp(user) {
//     return fetch('https://api.react-learning.ru/signup', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     }).then(onResponce);
//   }

//   getUserInfo() {
//     return fetch(`${this._baseUserUrl}/me`, {
//       headers: {
//         authorization: this._token,
//       },
//     }).then(onResponce);
//   }

//   getAllPosts() {
//     return fetch(`${this._basePostsUrl}`, {
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${getItem('postApi')}`,
//       },
//     }).then(onResponce);
//   }

//   addNewPost(post) {
//     return fetch(`${this._basePostsUrl}`, {
//       method: 'POST',
//       body: JSON.stringify(post),
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('postApi')}`,
//       },
//     }).then(onResponce);
//   }
//   changePost(post, postid) {
//     return fetch(`${this._basePostsUrl}/${postid}`, {
//       method: 'PATCH',
//       body: JSON.stringify(post),
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('postApi')}`,
//       },
//     }).then(onResponce);
//   }
//   deletePostById(idPost) {
//     return fetch(`${this._basePostsUrl}/${idPost}`, {
//       method: 'DELETE',
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('postApi')}`,
//       },
//     }).then(onResponce);
//   }

//   changePostLike(postId, islike) {
//     return fetch(`${this._basePostsUrl}/likes/${postId}`, {
//       method: islike ? 'DELETE' : 'PUT',
//       headers: {
//         'content-type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('postApi')}`,
//       },
//     })
//       .then(onResponce)
//       .catch((err) => {
//         console.log(`ошибка ${err}`);
//       });
//   }
// }

// const config = {
//   baseUrl: 'https://api.react-learning.ru',
//   basePostsUrl: 'https://api.react-learning.ru/v2/12/posts',
//   baseUserUrl: 'https://api.react-learning.ru/users',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyM2MzMDMyOTFkNzkwYjNmYzk2N2MiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDY1MDgwLCJleHAiOjE3MTM2MDEwODB9.podOuWY9CAovzjgr22aT8s3D__ihq20XmXXT06INvUA',
// };

// const api = new Api(config);

// export default api;

// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao ?? eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',