import emailjs from 'emailjs-com';

import {init} from 'emailjs-com';
init("OKXxmjNErUNHOPGT8");
const message = `
      Здравствуйте, я ${user.name} ${user.surname}, хотела бы работать в вашей компании!
      Ниже предоставляю данные обо мне:
      Номер телефона: ${user.number}.
    `
  const handleSubmit = (e) => {
    const templateId = 'template_bblkwws';
  
    sendFeedback(templateId, {message: message, from_name: `${user.name} ${user.surname}`, to_name: job.company.company_email})
  }

  const sendFeedback = (templateId, variables) => {
    emailjs.send(
    'service_jq_01', 
    templateId,
    variables
    ).then(res => {
      alert('Заявка отправлена!')
    })
    .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }