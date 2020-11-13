const db = require("../models/Index");
const Users = db.users;
const Op = db.Sequelize.Op;
const { errorMessage, successMessage, status } = require("../helpers/status");

const {
  hashPassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken
} = require("../helpers/validations");

exports.create = (req, res) => {
  const { email, name, password } = req.body;

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

  const users = {
    email: name,
    name: name,
    password: hashedPassword,
    is_admin: req.body.is_admin ? req.body.is_admin : false
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

  // Save Tutorial in the database
  // Users.create(tutorial)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Tutorial."
  //     });
  //   });
};

exports.index = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.send({
        message:
          err.message || `Some error occurred while retrieving tutorials. ${id}`
      });
    });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;
  const { is_admin } = req.user;

  if (!is_admin === true) {
    errorMessage.error = "Sorry You are unauthorized to make a user an admin";
    return res.status(status.bad).send(errorMessage);
  }
  if (isAdmin === "") {
    errorMessage.error = "Admin Status is needed";
    return res.status(status.bad).send(errorMessage);
  }

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Tutorial with id=" + id
      });
    });
};
