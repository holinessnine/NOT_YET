const express = require('express');
const router = express.Router();

router.get("/", function(req, res){
    let query = req.query;
    console.log("[QUERY]");
    console.log(query.page)
    
    // 텍스트 전달 : res.send({"key":"value"});
    // 그림(화면) 전달하면 res.render(경로)
    res.render('index', {title:"EJS 메인페이지"})
})

router.get("/about", function(req, res){
    res.send('About Page')
})
 
router.post("/postapi", function(req,res){
    let body = req.body;
    console.log(body)
    res.send('POST API')
})

module.exports = router;