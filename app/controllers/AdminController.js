const db = require("../models/Index");
const Users = db.users;

const {
  hashPassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken
} = require("../helpers/validations");

const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * Create A Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
exports.createAdmin = async (req, res) => {
  const { email, name, password } = req.body;

  // const { is_admin } = req.user;

  // const isAdmin = true;
  // const created_on = moment(new Date());

  // if (!is_admin === false) {
  //   errorMessage.error = "Sorry You are unauthorized to create an admin";
  //   return res.status(status.bad).send(errorMessage);
  // }

  if (isEmpty(email) || isEmpty(name) || isEmpty(password)) {
    errorMessage.error =
      "Email, password, first name and last name field cannot be empty";
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = "Please enter a valid Email";
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = "Password must be more than five(5) characters";
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);

  // const createUserQuery = `INSERT INTO
  //     users(email, first_name, last_name, password, is_admin, created_on)
  //     VALUES($1, $2, $3, $4, $5, $6)
  //     returning *`;
  // const values = [email, name, hashedPassword, isAdmin, created_on];

  const users = {
    email: name,
    name: name,
    password: hashedPassword
  };

  Users.create(users)
    .then(data => {
      const token = generateUserToken(
        data.email,
        data.id,
        data.is_admin,
        data.name
      );
      delete data.password;
      // successMessage.data = data;
      // successMessage.data.token = token;
      res.status(status.created).send(token);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

  // try {
  //   const { rows } = await dbQuery.query(createUserQuery, values);
  //   const dbResponse = rows[0];
  //   delete dbResponse.password;
  //   const token = generateUserToken(
  //     dbResponse.email,
  //     dbResponse.id,
  //     dbResponse.is_admin,
  //     dbResponse.first_name,
  //     dbResponse.last_name
  //   );
  //   successMessage.data = dbResponse;
  //   successMessage.data.token = token;
  //   return res.status(status.created).send(successMessage);
  // } catch (error) {
  //   if (error.routine === "_bt_check_unique") {
  //     errorMessage.error = "Admin with that EMAIL already exist";
  //     return res.status(status.conflict).send(errorMessage);
  //   }
  // }
};

/**
 * Update A User to Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} updated user
 */
// const updateUserToAdmin = async (req, res) => {
// const { id } = req.params;
// const { isAdmin } = req.body;
// const { is_admin } = req.user;
// if (!is_admin === true) {
//   errorMessage.error = "Sorry You are unauthorized to make a user an admin";
//   return res.status(status.bad).send(errorMessage);
// }
// if (isAdmin === "") {
//   errorMessage.error = "Admin Status is needed";
//   return res.status(status.bad).send(errorMessage);
// }
// const findUserQuery = "SELECT * FROM users WHERE id=$1";
// const updateUser = `UPDATE users
//       SET is_admin=$1 WHERE id=$2 returning *`;
// try {
//   const { rows } = await dbQuery.query(findUserQuery, [id]);
//   const dbResponse = rows[0];
//   if (!dbResponse) {
//     errorMessage.error = "User Cannot be found";
//     return res.status(status.notfound).send(errorMessage);
//   }
//   const values = [isAdmin, id];
//   const response = await dbQuery.query(updateUser, values);
//   const dbResult = response.rows[0];
//   delete dbResult.password;
//   successMessage.data = dbResult;
//   return res.status(status.success).send(successMessage);
// } catch (error) {
//   errorMessage.error = "Operation was not successful";
//   return res.status(status.error).send(errorMessage);
// }
// };
