import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
// import File from '../models/File';

class StudentController {
  async index(req, res) {
    /*
    const { name } = req.query;

    if(!name) {
      return req.status(400).json({ error: 'Invalid user'});
    }
    */

    const { page = 1, name } = req.query;

    const students = await Student.findAll({
      // where: { email: req.params.email },
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      /* include: [
        {
          model: File,
          as: 'avatar',
          attibutes: ['id', 'path', 'url'],
        },
      ], */
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      // password: Yup.string().required().min(6),
      age: Yup.number()
        .required()
        .min(2),
      height: Yup.string().required(),
      weight: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, height, weight } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
    // const user = await User.create(req.body);
    // return res.json(user);
  }

  async update(req, res) {
    // console.log(req.userId);
    // return res.json({ ok: true });

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      /*
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOff([Yup.ref('password')]) : field
      ),
      */
      age: Yup.number().min(2),
      height: Yup.string(),
      weight: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const { email, oldPassword } = req.body;

    // const student = await Student.findByPk(req.userId);

    /*
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
    const student = await Student.findByPk(req.params.id);

    const { id, name, email, age, height, weight } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    return res.status(200).json({ message: 'User deleted' });
  }
}

export default new StudentController();
