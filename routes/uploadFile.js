var express = require('express');
var router = express.Router();
const {uploadBannerImage} = require("../utils/multer");



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

module.exports = router;