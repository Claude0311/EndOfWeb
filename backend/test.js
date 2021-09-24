// const valid = require('email-verifier')
const sendmail = require('./routes/middleware/mail')

const main = async (m) => {
  sendmail(m)
}

// main('b00901029@ntu.edu.tw')
main('b07901029@ntu.edu.tw')
main('ck1041016@gl.ck.tp.edu.tw')
main('b07901029@g.ntu.edu.tw')
