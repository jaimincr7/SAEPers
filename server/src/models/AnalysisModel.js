class AnalysisModel{
    constructor(jsonObj){
        this.subsystem = jsonObj.subsystem
        this.mainLabel = jsonObj.mainLabel
        this.data = jsonObj.data // TODO jsonObj.data is an array of AnalysisDataModel, change it to conform to this clas
    }
}



class AnalysisDataModel{
    constructor(data){
        this.id = data.id
        this.horizontalLabel = data.horizontalLabel
        this.value = data.value
    }
}


module.exports = AnalysisModel