import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
// Registration from '../models/Registration';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    // const { student, teste } = data;
    const { student, registration } = data;
    // const registration = await Registration.findByPk(student.id);
    console.log(student);
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      // text: 'Seja bem-vindo a GymPoint!',
      template: 'registration',
      context: {
        student: student.name,
        plan: registration.plan_id,
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }
        ),
        price: registration.price,
      },
    });
  }
}

export default new RegistrationMail();
