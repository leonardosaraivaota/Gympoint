import * as Yup from 'yup';
import { Op } from 'sequelize';
import Plan from '../models/Plan';
// import Registration from '../models/Registration';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      // where: { student_id: req.student_id, answer: null },
      attributes: ['id', 'title', 'duration', 'price'],
      // order: ['price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
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

    const checkExistPlan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (checkExistPlan) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    // const { id, title, duration, price } = await Plan.create(req.body);
    // const { title, duration, price } = await Plan.create(req.body);
    const plan = await Plan.create(req.body);
    /*
    return res.json({
      id,
      title,
      duration,
      price,
    });
    */

    return res.json(plan);
  }

  async update(req, res) {
    // console.log(req.userId);
    // return res.json({ ok: true });

    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
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
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const checkExistPlanTitle = await Plan.findOne({
      where: {
        title: req.body.title,
        id: {
          [Op.ne]: plan.id,
        },
      },
    });

    if (checkExistPlanTitle) {
      return res.status(400).json({ error: 'This name already exists' });
    }

    // const { id, title, duration, price } = await Plan.update(req.body);
    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    // const registrations = await Registration.findByPk(plan.plan_id);

    /*
    if (plan.plan_id === registrations.plan_id) {
      return res
        .status(401)
        .json({ error: "You can't delete a plan with students" });
    }
    */

    // plan.canceled_at = new Date();

    // await plan.save();
    await plan.destroy();

    // return res.json(plan);
    return res.status(200).json({ message: 'Plan has been deleted' });
  }
}

export default new PlanController();
