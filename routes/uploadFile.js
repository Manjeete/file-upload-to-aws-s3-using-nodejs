var express = require('express');
var router = express.Router();
const {uploadBannerImage} = require("../utils/multer");


// for single file upload
router.post("/",[uploadBannerImage.single("file")],async(req,res) =>{
    try{
        res.status(200).json({
            status:true,
            image:`https://service-icon-admin.s3.ap-south-1.amazonaws.com/`+req.file.key
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            msg:err.message
        })
    }
})


router.post("/multi",[uploadBannerImage.array("file",2)],async(req,res) =>{
    try{
        res.status(200).json({
            status:true,
            file1:`https://service-icon-admin.s3.ap-south-1.amazonaws.com/`+req.files[0].key,
            file2:`https://service-icon-admin.s3.ap-south-1.amazonaws.com/`+req.files[1].key,

        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            msg:err.message
        })
    }
})

module.exports = router;