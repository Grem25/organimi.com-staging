this.init = function($) {

  var http = $.requestify, app = $.app, nodemailer = $.nodemailer;

  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "GoDaddy",
      auth: {
          user: "admin@organimi.com",
          pass: "Organimi2013!"
      }
  });



  app.get('/', function(req, res){
    var stats;
    http.get('http://secure.organimi.com/api/stats.json').then(function(data){
      stats = data.getBody();
      res.render('index', {stats: stats});
    });
  });


  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "", // sender address
      to: "info@organimi.com,jacob.zavitz@organimi.com,kamil.rextin@organimi.com", // list of receivers
      subject: "Organimi.com Contact Us: ", // Subject line
      text: "", // plaintext body
      html: "" // html body
  }


  app.post("/contact", function(req,res){
    var msg = req.body;
    mailOptions.from = msg.email;
    mailOptions.text = msg.message;
    mailOptions.html = "<b>On "+(new Date()).toString()+"</b><br/><p>Name: "+msg.name+"<br/>Email: "+msg.email+" says:<br/></p><p>"+msg.message+"</p>";

    SMPTSend(function(){res.redirect('/');});

  });

  function SMPTSend(cb){
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      smtpTransport.close(); // shut down the connection pool, no more messages
      cb();
    });
  }

}