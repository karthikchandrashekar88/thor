'use strict';
var iothub = require('azure-iothub');
var connectionString = 'HostName=ThorIot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=0jUWAQSG3NX6riDlWdmajdYHrg1H9jjLOBWMGkAgr34=';
var registry = iothub.Registry.fromConnectionString(connectionString);
var device = {
  deviceId: 'myFirstNodeDevice'
}
registry.create(device, function(err, deviceInfo, res) {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo);
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
});

function printDeviceInfo(err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device ID: ' + deviceInfo.deviceId);
    console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
  }
}
//Device ID: myFirstNodeDevice
//Device key: BFA3TlqpDOqgXoiv7sL9PNAaOrfqrD5L7Zktc6jHcuc=
