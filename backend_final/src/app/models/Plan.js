import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
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

export default Plan;
