
// import s3Client from "../config/dbS3.config"
const s3 = require("../config/dbS3.config")
const path = require('path');
const dotenv = require('dotenv');

const RaceLogModel = require("../models/RaceLogModel")
const SubsystemModel = require("../models/SubsystemModel")
const AnalysisModel = require("../models/AnalysisModel")


// Construct the absolute path to the .env file
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

class DBS3Controller{
    constructor(){
        if (DBS3Controller._instance){
            throw new Error("DBS3Controller class can't be instantiated more than once")
        }
        DBS3Controller._instance = this
    }

    // called in Upload View
    CreateRaceFolder(){
        const bucketName = process.env.AWS_MAIN_BUCKET
        const key = "race_2/"

        const metadata = {
            'x-amz-meta-id': "12",
            'x-amz-meta-name': "Irving Race",
            'x-amz-meta-date': Date(),
            'x-amz-meta-time': "60",
            // Add more metadata key-value pairs as needed
        };

        const params ={
            Bucket: bucketName,
            Key: key,
            Metadata: metadata,
        }

        s3.putObject(params, (err, data) =>{
            if (err) {
                console.error('Error uploading to S3:', err);
            } else {
                console.log('File uploaded successfully to:', data.Location);
            }
        })
    } // createRaceFolder

    // * Called in Home View, DONE
    async GetRaceFolders(){
        const bucketName = process.env.AWS_MAIN_BUCKET
        const prefix = process.env.AWS_MAIN_BUCKET_KEY
        const bucketParams = {
            Bucket : bucketName,
            Prefix : prefix,
            Delimiter: "/"
        };
        
        // Call S3 to obtain a list of the objects in the bucket
        // dataArr can contain an error
        const dataArr = await s3.listObjectsV2(bucketParams, (err, data) => {
            if (err){
                return new Error(err.message)
            }
            else{
                return data
            }
        }).promise() 

        if (dataArr instanceof Error){
            return dataArr
        }

        const foldersArr = dataArr.CommonPrefixes.map(folder => folder.Prefix)
        return foldersArr
    } // GetRaceFolders

    // * called in Subsytem View
    async GetRaceFolderContents(bucketKey){
        // O(n) run time
        function parseSubsystem(key){
            const rightIdx = key.length - 1
            if (key[rightIdx] == "/"){
                return "folder found"
            }

            const currWord = []
            let curr = rightIdx - 5
            while (key[curr] != "/"){

                if (key[curr] == "_"){
                    currWord.push(" ")
                }
                else{
                    currWord.push(key[curr])
                }
                
                curr -= 1
            
            }
            const reverseArr = currWord.reverse()

            // capitlizes subsytem"
            let temp = reverseArr[0]
            temp = temp.toUpperCase()
            reverseArr[0] = temp
            return reverseArr.join("")
        }

        // Specify the bucket name and the prefix (folder path) in S3
        const bucketName = process.env.AWS_MAIN_BUCKET;
        const prefix = bucketKey;

        const params = {
            Bucket: bucketName,
            Prefix: prefix,
        };
        
        const data = await s3.listObjectsV2(params, (err, data) => {
            if (err){
                return new Error(err.message)
            } return data
        }).promise()


        if (data instanceof Error){
            return data
        }

        // removes the folder from the contents
        const contents = data.Contents.filter(content => content.Key !== prefix) 
        const res = contents.map(content => (new SubsystemModel(parseSubsystem(content.Key), content.Key)))
        return res
            
            
    } // GetRaceFolderContents

    //* Helper func, DONE
    async GetMetaData(key){
        const bucketName = process.env.AWS_MAIN_BUCKET
        const params ={
            Bucket: bucketName,
            Key: key,
        }
        const data = await s3.getObject(params).promise()
        const metaData = data.Metadata
        metaData["bucket_key"] = key
        const res = new RaceLogModel(metaData)
        return res
    } // GetMetaData


    async GetGraphJSON(bucketKey){
        const params = {
            Bucket: process.env.AWS_MAIN_BUCKET,
            Key: bucketKey
        }
    
        const data = await s3.getObject(params, (err, data) => {
            if (err){
                return new Error(err.message)
            } 
            return data
        }).promise()
        if (data instanceof Error){
            return data
        }
        
        // grabs JSON data in a form of a buffer
        const dataBuffer = data.Body
        
        // Converts data buffer into object format
        const jsonObject = new AnalysisModel(JSON.parse(dataBuffer.toString("utf-8")))
        
        return jsonObject
    }

} // DBS3Controller

const dbs3Controller = new DBS3Controller()

module.exports = dbs3Controller