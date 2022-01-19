const nodemailer = require("nodemailer");

const mailFunc = (userData, reservation) => {
    const emailBody = `<p>Hello ${userData.firstname} ${userData.lastname},</p>
        <br/>
        <p>This is to confirm the cancellation of your reservation for flight ${reservation.flight.flightNum} from ${reservation.flight.deptAirport} to ${reservation.flight.arrAirport}. You will be refunded with an amount of ${reservation.amount} within the next 5-7 working days.</p>
        <br/>
        <p>Best wishes,</p>
        <p>ACL Airlines</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({ //https://accounts.google.com/b/1/DisplayUnlockCaptcha
        // host: "mail.google.com", port: 587,
        // host: 'smtp.gmail.com', port: 465,
        service: "gmail", port: 465,
        // type: 'SMTP', host: 'smtp.gmail.com',
        // secure: false,
        auth: {
            // type: "OAuth2",
            // user: "aclairlines@gmail.com",
            // serviceClient: "107621831840580858826",
            // privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvcpwgEziWk8dz\nBcVTaYmQ6pI6fR+VLg+5ArI6AwGjr1ggFAgt+9ypJTXSRJnKXxhR/jwtRpmD5rFK\ncGVBhTmtVO2ZQwjLXtmEwfbbHJhj3fUpq+swceYczrjv1QnL6AaodMC98RhLGZUh\nP8XkKrSFmBSisCabHjIyea2s8fYvfd6r+ucW2jNBxXmUp/Pyd9+Gh7M+mfFkrOom\n+jLT96OvRxJqdgmsfJJrNPUDfTTPNzQrUK1ac+X09STUfJOpml6fc4sNtzLGfqk+\nNTnBzGrkGW64Uy/v7xa8HjyZab/an1PHz3jensbzhfIVO5Ti/zjr7XoPs8chZ9dO\neMb5MDP5AgMBAAECggEAA9I8RNV2VnKTMlXcc8PMoNgb88cqbsO+j89luSARhstq\nYQDs6VlClCRPKoG7qN+nrznumXy8NquCqq7iyFt8hwzeis66WOsmGuZlCderw5Jm\n1tbmO/RFVpwQBTU4lQNKbPGee/LNuO11qIyspKjxrNIZay5aqAN2hMGyPvNwm7nS\nyTpkDUb4SBpPNaPPz5l4L0dCp5TyOUqUmCGP/PyweGvPE9mtPQBZD9caDNXhrX6X\n+jS7VDDhNu8vIXZUEpgC6+rXndEU6UVXOWIUcHxpBYAVE1wDySYzJ5FUk0WmNzkX\n0b5hq83VYtHBEKkVCg0fTOlxxHR1hTNWdYGoM7JCWwKBgQDhgcW23D++yHJju3qQ\n/wHKT6gsGKv+YNAfSHC5RoOIEQhGSMCvCmMHMk/LgcABYCoo5yznTiaQ3V8/LapA\nbgtKzNggDaT6xhNMXflH0qjSjYvhVJYkxcXnspuPJsV1c5YAgU6BtvAEBahyc6X3\nw2WOS9iPR+edHPqqOcecO44dGwKBgQDHK/gzFpmoQ0EsmEd7B47KvYOQZyeGbUPJ\n9FwJ1Fqgy2GNJt0p2S8k3DjtdMxiJXq4e6P2L+Utgmfc0842uu5ZO7zZtaA95ZJS\neTGaxNmIZGJORPbHGjisO/Mu3oT6Ae2bvdWIl9/PHguDH7Ww96Lo3PJPgK9iFbqq\ndqAZ99QoewKBgDE7h9LYWwJn+LFVaPjm85kbsveNm185+7YYtqN8hZLbRRczIv4U\nInKbxVgEx8qFGC896UvGgBz4d6bvbVALtmNqPXUiBXbKb8QocBgCIeF2DafwM6dr\nlj1zfQrPyCRQS9toX59qNRRrt87k+MMS4cUjQfBmHmbqwL8RRkcRqYEpAoGAIxnu\nriJHhk4ECHX18wrL8ZMgwqxLXPeYwNjd96WDK19sm9HDnIJ4OojNR5wUASAV1rmD\nlfmu7CxVXae+agrbwsIycDQAP6hb90kAowQaSl1WrfCdhU1ru379Rr9UtDLuy0nT\nfjU17myfHsbR4JRkE6IM2lIVlrW5ph0t7iWtME0CgYBcrQLdFYa2BL+wLtEAzlod\nS4jWAcWAuDZsf7sLBcHYfsyGRqjJ++vEgRJQi17jiXNZPmFh8uPK2mfmzOHH9+bl\nhzwISI9BYCtC0XXdvBuXrykq3xHqGUG2gxV3xXJ8tv66ZgCEX5xBmyd/xwQqSDS1\n7IHarZCXZIUPvfg7zFyUpA==\n-----END PRIVATE KEY-----\n",
            user: "aclairlines@gmail.com",
            pass: "ACLairline2021"
        }
        // tls: {
        //     rejectUnauthorized: false
        // }
    });

    let mailOptions = {
        from: '"ACL Airlines" <aclairlines@gmail.com>', // sender address
        to: "y.aeldairy@gmail.com", // list of receivers
        subject: "ACL Airlines notification", // Subject line
        html: emailBody, // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
        console.log("send email");
        if (err) {
            console.log("error", err);
        } else {
            console.log("success");
        }
    });
}

module.exports = mailFunc;