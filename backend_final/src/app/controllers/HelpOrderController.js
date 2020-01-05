import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
// import Mail from '../../lib/Mail';
import HelpMail from '../jobs/HelpMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import Notification from '../schemas/Notification';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      // where: { student_id: req.student_id, answer: null },
      // where: { student_id: req.params.id, answer: null },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
      // answer: Yup.string().required(),
      // answer_at: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /*
    const studentExists = await Student.findOne({ where: { email: req.body.email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    */

    // const helpOrders = await HelpOrder.create(req.body);
    // const student = await Student.findByPk(helpOrders.student_id);

    const student = await Student.findByPk(req.params.id);

    const helpOrders = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });

    await Notification.create({
      content: `Nova solicitação de ajuda de ${student.name}`,
      user: req.params.id,
      read: false,
    });

    await Queue.add(HelpMail.key, {
      student,
      // teste: 'teste',
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    // console.log(req.userId);
    // return res.json({ ok: true });

    const schema = Yup.object().shape({
      // student_id: Yup.number(),
      // question: Yup.string(),
      answer: Yup.string(),
      // answer_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /*
    const { email, oldPassword } = req.body;

    const student = await Student.findByPk(req.userId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }
    */
    /*
    if (oldPassword && !(await Student.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }
    */

    /*
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if(!student){
      res.status(400).json({ error: 'User not found '});
    }

    const findHelp = await HelpOrder.findOne({ where: { student_id: id }});
    const { answer } = await findHelp.update(req.body);
    return res.json(answer);
    */

    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exists' });
    }
    /*
    const checkHelpOrder = await HelpOrder.findOne({
      where: { id },
    });
    */
    const { student_id, question, answer, answer_at } = await HelpOrder.update(
      req.body
    );

    /*
    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });

    // const helpOrder = await HelpOrder.findByPk(id);
    /*
    const helpOrder = await HelpOrder.FindByIdAndUpdate(id, {
      answer: req.body.answer,
      answer_at: new Date(),
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exists' });
    }

    return res.json(helpOrder);
    */
  }

  async delete(req, res) {
    return res.status(200).json({ message: true });
  }
}

export default new HelpOrderController();
