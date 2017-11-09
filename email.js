var sendgrid = require('sendgrid')('azure_9747f8286fd2aad1519c06b7b3356c83@azure.com', 'spike#2015');
var email = new sendgrid.Email({
    to: 'karthikljc@gmail.com',
    from: 'anna@contoso.com',
    subject: 'test mail',
    text: 'This is a sample email message.'
});
sendgrid.send(email, function(err, json){
    if(err) { return console.error(err); }
    console.log(json);
});
