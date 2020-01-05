import * as Yup from 'yup';
import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';

import Registration from '../models/Registration';
// import Mail from '../../lib/Mail';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async index(req, res) {
    /*
    const registrations = await Registration.findAll({
      where: { student_id: req.student_id, answer: null },
      order: ['start_date'],
    });
    */

    // const { student_id } = req.params.id;

    const registrations = await Registration.findAll({
      // where: { student_id },
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'age'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      // end_date: Yup.date().required(),
      // price: Yup.number().required(),
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

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const dayStart = startOfDay(parseISO(start_date));
    const actualDate = new Date();

    if (isBefore(dayStart, startOfDay(actualDate))) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    const studentHasRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (studentHasRegistration) {
      return res
        .status(400)
        .json({ error: 'Student already has registration ' });
    }

    /*
    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Registration.create(req.body);


    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    */

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: dayStart,
      end_date: addMonths(dayStart, plan.duration),
      price: plan.price * plan.duration,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      registration,
      // teste: 'teste',
    });

    return res.json(registration);
  }

  async update(req, res) {
    // console.log(req.userId);
    // return res.json({ ok: true });

    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      price: Yup.number(),
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
    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Registration.update(req.body);

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    */

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const registration = await Registration.findByPk(req.params.id);

    const dayStart = startOfDay(parseISO(start_date));

    if (isBefore(dayStart, startOfDay(registration.start_date))) {
      return res.status(400).json({ error: 'Past date not allowed' });
    }

    await registration.update({
      plan_id,
      start_date: dayStart,
      end_date: addMonths(dayStart, plan.duration),
      price: plan.price * plan.duration,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    /*
    if (registration.student_id !== req.student_id) {
      return res.status(401).json({
        error: "You don't have permission to cancel this registration",
      });
    }
    */

    // registration.end_date = new Date();
    // await registration.save();

    await registration.destroy();

    // return res.json(registration);
    return res.json(200).json({ message: 'Registration removed' });
  }
}

export default new RegistrationController();
