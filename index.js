function formatstr(inputString) {
    const removeDiacritics = require("remove-diacritics");

    // Loại bỏ dấu từ chuỗi đầu vào
    var newString = removeDiacritics(inputString);

    // Thay thế khoảng trắng bằng dấu gạch ngang
    var stringWithHyphens = newString.replace(/\s+/g, '-');

    // Trả về chuỗi sau khi xử lý
    return stringWithHyphens;
}


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
let search="";
app.post("/search", async(req,res)=>{
try{
     search =formatstr(req.body.search).toLowerCase();
    const watch =await axios("https://ophim1.com/phim/"+`${search}`);
    console.log(req.body.epp);
    console.log(watch.data.episodes[0].server_data[0].filename);
    var filename =watch.data.episodes[0].server_data[0].filename;
    console.log(watch.data.episodes[0].server_data.length);
    
    var sotap =watch.data.episodes[0].server_data.length;
    console.log(watch.data.episodes[0].server_data[0].link_embed);
    var play =watch.data.episodes[0].server_data[0].link_embed;
    console.log(req.body.epp);
   
    
    console.log(req.body.epp);

    var posterurl =watch.data.movie.thumb_url;
    var name =watch.data.movie.name;
    var year =watch.data.movie.year;
    var hientai=watch.data.movie.episode_current;
    var daydu =watch.data.movie.episode_total;
    var noidung =watch.data.movie.content;
    console.log(`${name},${posterurl}`);

    res.render(index_path,{ep:sotap,title:filename,play:play,mota:noidung,hinhanh:posterurl,tenphim:name,hientai:hientai,nam:year,daydu:daydu});
}catch(error){
    res.render(index_path,{error:"a"});
    console.error(error.messenger);
}
console.log(search);
app.post("/change",async (req,res)=>{
   try{
    
    console.log(req.body.epp);
    var currentap =req.body.epp;
    const watch =await axios.get("https://ophim1.com/phim/"+`${search}`);
    var filename =watch.data.episodes[0].server_data[currentap-1].filename;
    console.log(filename);
    
    var play =watch.data.episodes[0].server_data[currentap-1].link_embed;
    res.render(index_path,{ep:sotap,title:filename,play:play,mota:noidung,hinhanh:posterurl,tenphim:name,hientai:hientai,nam:year,daydu:daydu});


   }

   catch{}
});


}
);







app.listen(port,(req,res)=>{
console.log(`sever is run at ${port}`);
});