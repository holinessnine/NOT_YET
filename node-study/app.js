const express = require('express');
const helmet = require("helmet");
const app = express();
const ejs = require("ejs");
const db = require('./model/db')
// html, css, image 등 경로 지정
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(__dirname + '/public')); // 고정 위치 참조하도록

// 사용 패키지 설정
app.use(helmet()); // 내려받은 템플릿: 그림파일 및 데이터를 서버에 전달
app.use(express.json());
app.use(express.urlencoded());

const mainRouter = require('./router/mainRouter');
app.use('/', mainRouter);
app.listen(3000, function(req,res){
    
    db.sequelize.sync({force:false});
    console.log('서버 실행중');
})