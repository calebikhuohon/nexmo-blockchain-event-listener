const Nexmo = require('nexmo');
const Web3 = require('web3');
const fs = require('fs');

const { NEXMO_API_KEY, NEXMO_APPLICATION_ID, NEXMO_APP_SECRET, NEXMO_JWT, PORT, NEXMO_PRIVATE_KEY, NEXMO_MEMBER_ID } = require('./config');

let NEXMO_CONVERSATION_ID = 'CON-071ffc25-bb84-4da9-ac1a-2a99f04c00f1';

const provider = new Web3.providers.WebsocketProvider('ws://localhost:8545');
let web3 = new Web3(provider)


provider.on('error', function (error) {
    console.log(error)
})

provider.on('end', e => {
    console.log('WS closed');
    console.log('Attemptroving to reconnect...');
    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });
    web3.setProvider(provider);
});

//init nexmo rest api lib
const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_APP_SECRET,
    applicationId: NEXMO_APPLICATION_ID,
    privateKey: NEXMO_PRIVATE_KEY
});

//web3
const contractJSON = JSON.parse(fs.readFileSync('../build/contracts/TextMessage.json'), 'utf8');
const abi = contractJSON.abi;

const contract = new web3.eth.Contract(abi, '0x04d4BD450439729e204c97201f2094a541701Dcb');


// Send message to the smart contract,  should it contain "from", the address its sent from?
//if it should, then...

let message = 'New message to the ethereum blockchain';

contract.methods.sendMessage('0x04d4BD450439729e204c97201f2094a541701Dcb', message).send({
    from: '0x04d4BD450439729e204c97201f2094a541701Dcb',
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
}).on('transactionHash', function (hash) {
    console.log('hash:--------------------', hash);

    //send nexmo event to create text
    nexmo.conversations.events.create(NEXMO_CONVERSATION_ID, {
        "type": "text",
        "from": NEXMO_MEMBER_ID,
        "body": {
            "text": message
        }
    }, (error, res) => {
        if (error) {
            console.error(error);
        } else {
            console.log('new text on the blockchain:--------------------------', res);
        }
    });
});

// Send message to the client
contract.events.NewText({}, function (error, event) {
    if (error) {
        console.log('error', error);
    } else {
        console.log('event:--------------------', event.args);

    }
}).on('data', function (data) {
    nexmo.conversations.events.create(NEXMO_CONVERSATION_ID, {
        "type": "text:delivered",
        "from": NEXMO_MEMBER_ID,
        "body": {
            "text": data
        }
    }, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log('result:------------', result);
            console.log('data:---------------', data);

        }
    });
})

contract.events.allEvents(function (err, res) {
    if (err) {
        console.log(err)
    }
    console.log(res)
})