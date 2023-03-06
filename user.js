//import
const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

//all Users
const getAllUsers = (req, res) => {
    prisma.userGame
      .getAllUsers()
      .then((users) => {
        console.log("User Found, User: ", users);
        res.json(users);
      })
      .catch((error) => {
        console.log("Error Detected: ", error);
        res.json([]);
      });
  };

  //single user
  const getSingleUser = (req, res) => {
    const id = Number(req.params.id); // "1" => 1
  
    prisma.userGame
      .findUnique({ where: { id: id } })
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
        res.json(user);
      })
      .catch((error) => {
        console.log("Error Detected: ", error);
        res.json({ status: "User not found" });
      });
  };

  //create user
  const createUser = async (req, res) => {
    // req.body = { id, username, password }
  
    // manual validation
    if (!req.body) {
      res.json({
        status: "failed to create user",
        message: "missing payload",
      });
      return;
    }
    if (!req.body.password) {
      res.json({
        status: "failed to create user",
        message: 'missing property "password" in payload',
      });
      return;
    }
    if (!req.body.username) {
      res.json({
        status: "failed to create user",
        message: 'missing property "username" in payload',
      });
      return;
    }
  
    try {
      const result = await prisma.userGame.create({
        data: { username: req.body.username, password: req.body.password },
      });
      res.json({ status: "Successful to register", info: result });
    } catch (error) {
      res.json({ status: "Failed to register", info: error });
    }
  };

  //edit user
  const editUser = async (req, res) => {
    const id = Number(req.params.id);
  
    // manual validation
    if (!req.body) {
      res.json({
        status: "failed to update user",
        message: "missing payload",
      });
      return;
    }
    if (!req.body.password) {
      res.json({
        status: "failed to update user",
        message: 'missing property "password" in payload',
      });
      return;
    }
    if (!req.body.username) {
      res.json({
        status: "failed to update user",
        message: 'missing property "username" in payload',
      });
      return;
    }
  
    try {
      const result = await prisma.userGame.update({
        where: { id: id },
        data: { username: req.body.username, password: req.body.password },
      });
      res.json({ status: "Update Successful", info: result });
    } catch (error) {
      res.json({ status: "Update Failed", info: error });
    }
  };

  //delete user
  const deleteUser = (req, res) => {
    const id = Number(req.params.id);
  
    prisma.userGame
      .delete({ where: { id: id } })
      .then((info) => {
        res.json({ status: "Update Successful", info });
      })
      .catch((error) => {
        res.json({ status: "Update Failed", message: error });
      });
  };


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    editUser,
    deleteUser,
  };