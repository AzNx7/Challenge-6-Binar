//import
const express = require("express");
const port = 7000
const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

const app = express();

//
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//view engine
app.set('views', './server/views')
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// files
const {
    getAllUsers,
    getSingleUser,
    createUser,
    editUser,
    deleteUser,
  } = require("./user");

// main page and game page
app.get('/', (req, res) => {
    res.render('index')
  })
app.get('/play', (req, res) => {
    res.render('janken')
  })
  

// Route untuk page (HTML):
app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/database", async (req, res) => {
    const users = await prisma.userGame.findMany({
      include: { userBio: true },
    }); // baca database
    res.render("database", { users: users }); // changed to database since index already exist to acces database type localhost:70000/database
  });
  app.get("/create-user", (req, res) => {
    res.render("create-user");
  });
  app.get("/user/update/:id", async (req, res) => {
    const id = Number(req.params.id);
  
    const user = await prisma.userGame.findUnique({ where: { id } });
    res.render("update-user", { user });
  });
  
  // Route untuk handle Sumbit form:
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // kalau di hit dengan data yang sesuai: kita redirect ke halaman utama.
    // kalau di hit dengan data yang salah: kita biarkan di halaman login.
    if (username === "admin" && password === "superadminkerenabis") {
      res.redirect("/database");
    } else {
      res.redirect("/");
    }
  });
  app.post("/create-user", async (req, res) => {
    const { username, password } = req.body;
  
// call database
    await prisma.userGame.create({
      data: {
        username,
        password,
        userBio: {
          create: {
            age: Number(req.body.age),
            city: req.body.city,
            gender: req.body.gender,
            name: req.body.fullname,
          },
        },
      },
    });
    res.redirect("/database");
  });
  app.post("/user/update", async (req, res) => {
    const { id, username, password } = req.body;
    const numberId = Number(id);
  
    await prisma.userGame.update({
      where: { id: numberId },
      data: { username, password },
    });
    res.redirect("/database");
  });

// api route
app.get("/api/user", getAllUsers);
app.get("/api/user/:id", getSingleUser);
app.post("/api/user", createUser);
app.put("/api/user/:id", editUser);
app.delete("/api/user/:id", deleteUser);

//Port Listen
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });