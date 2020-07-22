// getting dom elements
var inputRoom = document.getElementById('room');
var btnEnter = document.getElementById('enter');
var divSelectRoom = document.getElementById('selectRoom');
var divVideos = document.getElementById('videos');

// variables and constants
var apiKey;
var sessionId;
var token;
var roomName;
var SERVER_BASE_URL = 'https://videochatt07.herokuapp.com/';

// Let's do this
btnEnter.onclick = function () {
    if (inputRoom.value === '') {
        alert('Please type a room name');
    } else {
        roomName = inputRoom.value;

        fetch(SERVER_BASE_URL + '/room/' + roomName).then(function (res) {
            return res.json()
        }).then(function (res) {
            apiKey = res.apiKey;
            sessionId = "2_MX40Njg1MzI0NH5-MTU5NTQyMTkzNjc4MH5RR1NVZy9mUEFpckluaGRUMmppblNkT01-fg";
            token = "T1==cGFydG5lcl9pZD00Njg1MzI0NCZzaWc9NDg3NmU3MGFmNjIxZWE5NmI5MzYyNjRmNTdhZjFjOThjZThjMWU1ODpzZXNzaW9uX2lkPTJfTVg0ME5qZzFNekkwTkg1LU1UVTVOVFF5TVRrek5qYzRNSDVSUjFOVlp5OW1VRUZwY2tsdWFHUlVNbXBwYmxOa1QwMS1mZyZjcmVhdGVfdGltZT0xNTk1NDIxOTY2Jm5vbmNlPTAuMTIxNzAyMjQ3NzcxOTQ0MDUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NTQyNTU2NSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
            initializeSession();
        }).catch(handleError);
    }
}

// tokbox code
function initializeSession() {

    divSelectRoom.style = "display: none";
    divVideos.style = "display: block";

    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
        session.subscribe(event.stream, 'subscribers', {
            insertMode: 'append',
            width: '360px',
            height: '240px'
        }, handleError);
    });
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '360px',
        height: '240px'
    }, handleError);

    // Connect to the session
    session.connect(token, function (error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}