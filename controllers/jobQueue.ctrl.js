const kue = require('kue');
const nodemailer = require('nodemailer');

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'mytonic.mailer@gmail.com',
        pass: 'TelenorHealth'
    }
};
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(smtpConfig);
var queue = kue.createQueue({redis: 'redis://localhost:6379/0'});
queue.watchStuckJobs(1000);


exports.sendEmail = function(subject, body){
  var job = queue.create('sendEmail', {subject:subject, body:body})
    .attempts(2)
    .backoff( {delay: 60*1000, type:'exponential'})
    .ttl(30*1000)
    .events(false)
    .save( function(err){
       if( err ) console.log( err);
    });

  job.on('complete', function(result){
    console.log('Job completed with data ', result);
  }).on('failed attempt', function(errorMessage, doneAttempts){
    console.log('Job failed',errorMessage,doneAttempts);
  }).on('failed', function(errorMessage){
    console.log('Email sending failed',errorMessage);
  })
}

queue.process('sendEmail', 20, function(job, done){
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Node Geek Mailer" <mytonic.mailer@gmail.com>',
    to: job.data.email || 'ikrum.bd@gmail.com',
    subject: job.data.subject,
    text: job.data.body,
    html: job.data.body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error) return done(error);
    done();
  });
});


queue.on( 'error', function( err ) {
  console.log(err);
});

process.on('SIGINT', function(){
  queue.shutdown( 5000, function(err) {
    console.log( 'Kue shutdown: ', err||'' );
    process.exit( 0 );
  });
});

process.on( 'SIGTERM', function ( sig ) {
  queue.shutdown( 5000, function(err) {
    console.log( 'Kue shutdown: ', err||'' );
    process.exit( 0 );
  });
});

process.on( 'uncaughtException', function(err){
  console.error( 'uncaughtException: Shuting down the jobQueue' );
  console.log(err);
  queue.shutdown( 1000, function(err2){
    console.error( 'Kue shutdown result: ', err2 || 'OK' );
    process.exit( 0 );
  });
});
