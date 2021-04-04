const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const cors = require('cors')
var check = 0;
var message;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var sessionIdValue;


app.post('/', async function (req, res) {
    // Here's how you get the data from the front-end.
    message = req.body.text;
    message = String(message);
    console.log("Message to Bot: " + message);
    // init assistant
    var assistantIdValue = '398fd1c8-a06f-4fdc-b9f1-c553d1878907';

    const assistant = new AssistantV2({
        version: '2020-09-24',
        authenticator: new IamAuthenticator({
            apikey: 'tuG9mC6jBr9nSf5DVhHqoB22kDtnUOmTkuRbpaDBuCng',
        }),
        serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/384648db-6aed-4ceb-871b-321b292ff899',
    });
    // get result from starting assistant service
    try {
        if(check === 0){
            console.log("Creating session");
            await assistant.createSession({ assistantId: assistantIdValue })
            .then(ans =>{
                sessionIdValue = ans.result.session_id;
                console.log(sessionIdValue);
            })        
            .catch(err => {
                console.log(err);
              });
              check = 1;
        }
    
        await assistant.message({
            assistantId: assistantIdValue,
            sessionId: sessionIdValue,
            input: {
              'message_type': 'text',
              'text': '' + message
              }
            })
            
            .then(ans => {
              console.log(ans.result.output.generic[0]);
              //console.log(JSON.stringify(ans.result, null, 2));
              //Send back to user
              res.send(ans.result);
            })
            .catch(err => {
              console.log(err);
            });

    }
    catch(e) {
        console.error(e);
        res.status(400).send("BAD")
    }
})

app.listen(3001)