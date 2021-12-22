const emailBody = `<p>Hello ${userData.firstname} ${userData.lastname},</p>
        <br/>
        <p>This is to confirm your booking number ${booking} for flights ${deptFlight.flightNumber} and ${retFlight.flightNumber}.</p>
        <p>You have been charged an amount of ${amount}.</p>
        <br/>
        <p>Best wishes,</p>
        <p>ACL Airlines</p>`;
            axios.post("http://localhost:3001/user/sendEmail", {
                email: userData.email,
                emailBody: emailBody
            })
                .then(() => {
                    // console.log("email sent", res);

                }
                ).catch((err) => {
                    console.log("error", err);
                });
            //