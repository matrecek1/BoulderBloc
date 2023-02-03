import AWS from "aws-sdk"

(async function(){
    try {
        AWS.config.update({
            
        })
    } catch (e) {
        console.log("error: ",e);
    }
})()