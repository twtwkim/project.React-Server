require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');
const api = require("./api") //파일이름까지는 생략해도된다.(index 생략된거)
const jwtMiddleware = require('./lib/jwtMiddleware')
const multer = require('@koa/multer')
const serve = require('koa-static');
const path = require('path');


//환경 파일 가져오기
const {PORT, MONGO_URI} = process.env;

//몽고 DB 연결
mongoose
.connect(MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB!!")
})
.catch((e)=>{
    console.error(e);
})

//server,
const app = new Koa();

//라우터 설정
const router = new Router();
router.use('/api', api.routes())

app
.use(bodyParser())
.use(jwtMiddleware) // cookies 가져오기
.use(router.routes())
.use(router.allowedMethods())


const port = PORT || 4000 ;
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})














// get 데이터 가져오는,
// post 데이터 전달,
// delete 데이터 삭제, 
// put 데이터 삽입,
// patch 데이터 수정
 

// mongoose
//     .connect(MONGO_URI)
//     .then(()=>{
//         console.log("Connected to MongoDB");
//     })
//     .catch(e=>{
//         console.log(e);
//     })
    
    // // controller
    // const getCtrl = (ctx) =>{
    //     ctx.body="Single Page Application";
    //     console.log(ctx.params);
    //     console.log(ctx.query);
    // }
    // //api
    // router.get('/react/:name', getCtrl)
    // app.use(bodyParser())

    // let postId = 1;
    // const posts = [
    //     {
    //         id:1,
    //         title:"react",
    //         body: "Single Page Application"
    //     }
    // ]

    // const write = (ctx) => {
    //     const {title, body} = ctx.request.body; //글러브 따로 만든다
    //     console.log(title, body)
    //     postId += 1;
    //     const post = {id:postId, title, body};
    //     posts.push(post);
    //     ctx.body=posts;
    // } // 컨트롤 따로 만들고

    // router.post('/write', write) // 라우터 따로 만들고

    // app.use((ctx, next)=>{ //화면에 뿌리는 것 body
//     console.log(ctx.param);
//     //ctx.boddy는 웹사이트 화면을 찍는, ctx.url은 주소 찍고, ctx.query는 포트 뒤에 문구 찍어버림
//     // next(); // 다음 실행으로 이어질때 사용한다.
// });