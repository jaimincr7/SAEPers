const express = require('express');
const router = express.Router();

const dbs3Controller = require("../controllers/dbS3.controllers")

// api/getAllRaces
router
    .route("/getAllRaces")
    .get(async (req, res) => {
        try{
            const foldersArr = await dbs3Controller.GetRaceFolders()
            const S3ObjArr = foldersArr.map(folder => dbs3Controller.GetMetaData(folder))
            const metaDataArr = await Promise.all(S3ObjArr)
            res.json(metaDataArr)
        } catch (err){
            res.json(err)
        }
    }) 

// api/getRaceFolderContents
router
    .route("/getRaceFolderContents")
    .post(async (req, res) => {

        if (!("bucket_key" in req.body)){
            res.send("Request body not found")

        } else{
            // if user types in url path in search bar
            const bucketKey = req.body["bucket_key"] // error checking if property 'bucket_key' does not exist
            try{
                const data = await dbs3Controller.GetRaceFolderContents(bucketKey)
                res.json(data)

            } catch(err){
                // TODO need to implement a better way to handle error
                res.json(err)
            } // catch
        } // else

        
    }) 

// api/getGraphJSON
router
    .route("/getGraphJSON")
    .post(async (req, res) => {
        if (!("bucket_key"  in req.body)){
            res.send("Request body missing")
        } else{
            try{
                const bucketKey = req.body["bucket_key"]
                const data = await dbs3Controller.GetGraphJSON(bucketKey)
                res.json(data)
            } catch (err){
                res.json(err)
            } // catch
        } // else

    })

module.exports = router