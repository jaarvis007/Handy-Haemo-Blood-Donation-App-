const express = require("express");
const { getDataController } = require("../controllers/fetchController");
const userModel = require("../models/userModel");

const router = express.Router();

//get all data...
router.get("/data", async(req,res)=>{
    try{
        userModel.findOne().then((data)=>{
            console.log(data);
            res.status(200).json({data:data});
        }).catch((e)=>{
            console.log(e);
            res.status(500).json({msg:"unable to find data"});
        })

    }catch(e){
        console.log(e);
        res.status(500).json({msg:"unable to get data"});
    }
});

router.get("/search",async(req,res)=>{
    try{
        const searchItem=req.query.searchItem;
        console.log(searchItem);
        const searchRegex=new RegExp(searchItem,'i');

        await userModel.find({
            $or:[
                {_id:searchRegex},
                { name:searchRegex},
                {email:searchRegex},
                {bloodtype:searchRegex},
                {location:searchRegex},
                {phone:searchRegex}
            ]
        }).then((data)=>{
            console.log(data);
            res.status(200).json({data:data})
        }).catch((e)=>{
            console.log(e);
            res.status(500).json({msg:"unable to search data"});
        })

    }catch(e){
        console.log(e);
        res.status(500).json({msg:"unable to search data"});
    }
});

module.exports = router;
