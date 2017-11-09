var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

//var connectionString = 'HostName=ThorIot.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKey=BFA3TlqpDOqgXoiv7sL9PNAaOrfqrD5L7Zktc6jHcuc=';
var connectionString = 'HostName=ThorIot.azure-devices.net;DeviceId=OnlineWebClient;SharedAccessKey=blA5Xz24D2LVk7AJhhxCoKer1Fgq0Ng1fE3B9s8PpZ0=';
var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function(err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');
        // Create a message and send it to the IoT Hub every second
        var temperature = 20 + (Math.random() * 15);
        var humidity = 60 + (Math.random() * 20);
        var data = JSON.stringify({ deviceId: 'CARS', temperature: temperature, humidity: humidity });
        var message = new Message(data);
        message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }
};

client.open(connectCallback);