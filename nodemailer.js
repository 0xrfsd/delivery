const nodemailer = require("nodemailer");
const axios = require("axios");

const Mailer = () => {
  const [receivers, setReceivers] = React.useState([]);
  const [message, setMessage] = React.useState({});
  // e.g. message = { from: "sender@server.com", to: "receiber@sender.com", subject: "Assunto", text: "Pleaintext message", html: "<p>HTML message</p>" }

  React.useEffect(() => {
    getReceivers();
    main();
  });

  const getReceivers = async () => {
    await axios
      .get("http://localhost:3000/emailtosend")
      .then((res) => {
        console.log(res);
        setReceivers(res);
      })
      .then((e) => {
        console.log(e);
      });
  };

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "9q9o6b3@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  return <>Email ID HTML {receivers}</>;
};

export default Mailer;
