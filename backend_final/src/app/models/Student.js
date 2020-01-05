import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // password: Sequelize.VIRTUAL,
        // password_hash: Sequelize.STRING,
        age: Sequelize.INTEGER,
        height: Sequelize.FLOAT,
        weight: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    /*
    this.addHook('beforeSave', async () => {
      if (User.password) {
        User.password_hash = await bcrypt.hash(User.password, 8);
      }
    });
    */

    return this;
  }
  /*
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  */
}

export default Student;
