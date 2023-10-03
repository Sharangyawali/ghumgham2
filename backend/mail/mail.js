const nodemailer=require('nodemailer')
require('dotenv').config()
const sendverifymail=async(name,email,_id)=>{
    try {
        let mailTransporter= nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        let details={
            from:"ghumfirproduction@gmail.com",
            to:email,
            subject:"For Verification Mail",
            html:generateEmailTemplate(name,_id)
        }
        
        mailTransporter.sendMail(details,function(error,info){
            if(error){"wrong email"}
            else{
                console.log("email has been sent",info.response)
            }
        })
    } catch (error) {
       console.log(error) 
    }
}
module.exports=sendverifymail

const generateEmailTemplate=(name,_id)=>{
    return`

<body style="background-color:grey">
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="550" bgcolor="white" style="border:2px solid black">
		<tbody>
			<tr>
				<td align="center">
					<table align="center" border="0" cellpadding="0"
						cellspacing="0" class="col-550" width="550">
						<tbody>
							<tr>
								<td align="center" style="background-color: #8acafb;
										height: 50px;">

									<a href="#" style="text-decoration: none;">
										<p style="color:white;
												font-weight:bold;">
											GHUMFIR!
										</p>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr style="height: 300px;">
				<td align="center" style="border: none;
						border-bottom: 2px solid #8acafb;
						padding-right: 20px;padding-left:20px">

					<p style="font-weight: bolder;font-size: 42px;
							letter-spacing: 0.025em;
							color:black;">
                            Hello ${name}
                            <br/>
						Welcome to our Team
					</p>
				</td>
			</tr>

			<tr style="display: inline-block;">
				<td style="height: 150px;
						padding: 20px;
						border: none;
						border-bottom: 2px solid #361B0E;
						background-color: white;">
					
					<h2 style="margin-left: 100px;
                        align-items: center;">
						<a href="http://localhost:3000/verify?id=${_id}">Click here</a> to verify your email
				</h2>
				</td>
			</tr>
		</tbody>
	</table>
</body>
`
}