const express =require("express");
const app =express();
const body =require('body-parser');
const path =require("path");
const axios =require("axios");
const main_path =(path.join(__dirname,"view/main.ejs"));
const index_path=(path.join(__dirname,"/view/index.ejs"));
const mainurl ="https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=";
const contenturl ="https://ophim1.com/";
app.use(body.urlencoded({extended:true}));
const port =3000;
app.use(express.static("public"));
app.get("/", async(req,res)=>{
    
    const page=1;
const topphim =await axios.get(mainurl+`${page}`);
console.log(topphim.data.items.length);
const thum =topphim.data.items;

res.render(main_path,{thum:thum,art:thum});

});
app.post("/search", async(req,res)=>{

const watch =await axios("https://ophim1.com/phim/"+`${req.body.search}`);
console.log(watch.data.movie.episode_total);
var sotap =watch.data.movie.episode_total;
res.render(index_path,{ep:sotap});
});






app.listen(port,(req,res)=>{
console.log(`sever is run at ${port}`);
});