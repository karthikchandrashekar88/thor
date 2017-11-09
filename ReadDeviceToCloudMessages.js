'use strict';

var EventHubClient = require('azure-event-hubs').Client;
//HostName=ThorIot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=0jUWAQSG3NX6riDlWdmajdYHrg1H9jjLOBWMGkAgr34=
//var connectionString = 'HostName=ThorIot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=0jUWAQSG3NX6riDlWdmajdYHrg1H9jjLOBWMGkAgr34=';
var connectionString = 'HostName=ThorIot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=0jUWAQSG3NX6riDlWdmajdYHrg1H9jjLOBWMGkAgr34=';
var printError = function(err) {
    console.log(err.message);
};

var printMessage = function(message) {
    console.log('Message received: ');
    console.log(JSON.stringify(message.body));
    console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function(partitionIds) {
        return partitionIds.map(function(partitionId) {
            console.log('partitionId :', partitionId);
            return client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() }).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);