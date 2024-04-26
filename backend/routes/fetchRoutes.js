const express = require("express");
const { getDataController } = require("../controllers/fetchController");
const userModel = require("../models/userModel");

const router = express.Router();

//get all data...
router.get("/data", async(req,res)=>{
    try{
        userModel.find().then((data)=>{
            // console.log(data);
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
    console.log(req.query.searchItem);
    try{
        const searchItem=req.query.searchItem;
        // const searchRegex=new RegExp(searchItem,'i');

        await userModel.find({
            $or:[
                { __id:{$regex:searchItem, $options:'i'}},
                { name:{$regex:searchItem, $options:'i'}},
                { email:{$regex:searchItem, $options:'i'}},
                { location:{$regex:searchItem, $options:'i'}},
                // { phone:{$regex:searchItem, $options:i}},
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

router.post('/update', async (req, res) => {
    
    const userId = req.query.id;
    console.log(userId);
    const { name, location, bloodtype } = req.body;

    console.log(name,bloodtype,location);

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields conditionally based on incoming data
        if (name && name !== user.name) {
            user.name = name;
        }
        if (bloodtype && bloodtype !== user.bloodtype) {
            user.bloodtype = email;
        }
        if (location && location !== user.location) {
            user.location = location;
        }

        // Save the updated user document
        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
