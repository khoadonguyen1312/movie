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
console.log(watch.data.episodes[0].server_data[1].filename);
var filename =watch.data.episodes[0].server_data[1].filename;
console.log(watch.data.episodes[0].server_data.length);
console.log(req.body.epp);
var sotap =watch.data.episodes[0].server_data.length;
console.log(watch.data.episodes[0].server_data[1].link_embed);
var play =watch.data.episodes[0].server_data[1].link_embed;


res.render(index_path,{ep:sotap,title:filename,play:play});
});






app.listen(port,(req,res)=>{
console.log(`sever is run at ${port}`);
});