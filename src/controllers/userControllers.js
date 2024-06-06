import bcrypt from 'bcrypt';
import users from '../models/Users.js';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';

async function userDetails(req, res) {
  const user_id = req.params.user_id;

  try {
    const user = await users.findOne({ where: { user_id } });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting user.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Getting user successful.',
      data: {
        email: user.email,
        phone: user.phone,
        name: user.name,
        birthday: user.birthday
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }
}

async function updateUserDetails(req, res) {
  const user_id = req.params.user_id;
  const { email, phone, name, birthday } = req.body;

  try {
    const existingUser = await users.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { phone }],
        user_id: { [Sequelize.Op.ne]: user_id }
      }
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Update user failed.'
      });
    }

    const user = await users.findOne({ where: { user_id } });
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Update user failed.'
      });
    }

    user.email = email;
    user.phone = phone;
    user.name = name;
    user.birthday = birthday;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Update user successful.',
      data: {
        user_id: user.user_id,
        email: user.email
      }
    });
  } catch (error) {
    console.error(`Error updating user details: ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
}

async function resetPassword(req, res) {
  const { passwordOld, passwordNew } = req.body;
  const user_id = req.params.user_id;

  if (!passwordOld || !passwordNew) {
    return res.status(400).json({ 
        status: 'fail',
        message: 'Old password and new password are required.' 
    });
  }

  try {
    const user = await users.findOne({ where: { user_id } });

    if (!user || !bcrypt.compareSync(passwordOld, user.password)) {
      return res.status(400).json({ 
          status: 'fail',
          message: 'Invalid user_id or password.' 
      });
    } else if (bcrypt.compareSync(passwordNew, user.password)) {
      return res.status(400).json({ 
          status: 'fail',
          message: 'New password and old password matched.' 
      });
    }

    user.password = bcrypt.hashSync(passwordNew, 10);
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Reset password successful.',
        body: { user_id: user.user_id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
        error: error.message 
    });
  }
}

export default { userDetails, updateUserDetails, resetPassword };