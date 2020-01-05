import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        // student_id: Sequelize.INTEGER,
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
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

  static associate(models) {
    // this.belongsTo(models.Student, { foreignKey: 'id' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
