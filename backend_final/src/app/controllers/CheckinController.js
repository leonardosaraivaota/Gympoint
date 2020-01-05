import * as Yup from 'yup';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.id;
    const checkins = await Checkin.findAll({
      // where: { student_id },
      where: { student_id },
      order: ['created_at'],
    });

    // const student = await Student.findByPk(req.params.id);

    return res.json(checkins);
  }

  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */
    const student_id = req.params.id;

    // const student = req.params.id;
    // const student = await Student.findByPk(req.params.id);

    const student = await Student.findByPk(student_id);
    // const student = await Student.findOne({ where: { id: student_id } });

    if (!student) {
      return res.status(400).json({ error: 'User not found' });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = req.params.id;

    const checkin = await Checkin.update({
      student,
    });

    return res.json(checkin);
  }

  async delete(req, res) {
    return res.status(200).json({ message: true });
  }
}

export default new CheckinController();
