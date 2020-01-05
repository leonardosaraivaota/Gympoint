// import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
import HelpOrder from '../models/HelpOrder';

class HelpMail {
  get key() {
    return 'HelpMail';
  }

  async handle({ data }) {
    // const { student, teste } = data;
    const { student } = data;

    const helpOrder = await HelpOrder.findByPk(student.id);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Resposta sobre dúvida',
      // text: 'Seja bem-vindo a GymPoint!',
      template: 'help',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new HelpMail();
