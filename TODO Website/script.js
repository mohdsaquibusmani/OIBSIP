const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { render } = require("ejs");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

//database connect
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/to-do-listDB');
  console.log("Database Connected");
}

//defining Schema
const newItemSchema = new mongoose.Schema({
    item: String,
    completed:Boolean,
    isChecked:Boolean
  });
  
//defining Model
const Item = mongoose.model('Item', newItemSchema);


app.get("/",async (req,res)=>{
    const allitems = await Item.find();
    res.render("list",{items:allitems});
})
app.post("/",async (req,res)=>{
    const newItem = req.body.newItem;
    //saving this newItem in db
    const item = new Item({item:newItem,completed:false,isChecked:false});
    await item.save();
    res.redirect("/");

})
app.post("/completed",async (req,res)=>{
    const completedLength = req.body.completedItem.length;
    if(completedLength==2){
        var completedItem = req.body.completedItem[0];
        try{
            const findItem = await Item.findById(completedItem);
            await Item.updateOne(findItem,{completed:true,isChecked:true})
        }catch(err){
            console.log(err);
        }
    }else{
        completedItem=req.body.completedItem;
        try{
            const findItem = await Item.findById(completedItem);
            await Item.updateOne(findItem,{completed:false,isChecked:false})
        }catch(err){
            console.log(err);
        }
    }
    res.redirect("/");

});
app.post("/delete",async (req,res)=>{
const deleteItem = req.body.delButton;
try{
await Item.findByIdAndDelete(deleteItem);
}catch(err){
    console.log(err);
}
res.redirect("/");
});

app.post("/update",async (req,res)=>{
    const {updateTask,updatedTask} = req.body;
    if(updatedTask){
    await Item.findByIdAndUpdate(updateTask,{item:updatedTask});
    }
    res.redirect("/");
})

app.post("/update-page",(req,res)=>{
    const updateItem = req.body.upButtonId;
    const updateName = req.body.upButtonName;
    res.render("update",{updateItem:updateItem,updateName:updateName});
})

app.listen(1212,()=>{
    console.log("Server has started 1212");
});