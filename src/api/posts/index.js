const Router = require("koa-router");
const postsCtrl = require("./postsCtrl");
const checkLoggedIn = require('../../lib/checkLoggedIn')
const multer = require('@koa/multer')

const posts = new Router();



// 라우터: /api/posts
posts.get('/', postsCtrl.list) // postList
posts.post('/', checkLoggedIn, postsCtrl.write) // 순서대로 실행함. checkloggedin에 return을 next를 줬기때문에

// 라우터: /api/posts/:id
const post = new Router();
post.get('/', postsCtrl.read) // post
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove) // delete
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update) // 

posts.use("/:id", postsCtrl.getPostById, post.routes()) // id 검사하는것 추가



module.exports = posts
