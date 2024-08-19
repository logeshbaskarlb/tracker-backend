const express = require("express")
const app = express()
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require("./db/db")
const  { readdirSync } = require("fs")
const dotenv = require("dotenv").config();

// middleware to change the file to json
app.use(express.json())
// cors
app.use(cors({
    origin: "*"
}))

// Load all routes dynamically
readdirSync('./routes').map((route) => {
    app.use("/api/v1", require(`./routes/${route}`));
});

app.get('/', (req, res)=> {
    res.send('Hello World!')
})

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User or password not match!' });
      }
  
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(404).json({ message: 'User or password not match!' });
      }
  
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
      res.status(200).json({
        userId: user._id,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      const result = await newUser.save();
      const token = jwt.sign(
        { userId: result._id },
        secretKey,
        { expiresIn: '24h' }
      );
  
      res.status(201).json({
        message: 'Registration success',
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



const server = () => {
    db()
    app.listen(process.env.PORT, ()=> {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}
server();