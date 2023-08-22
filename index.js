const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const RepRoutes = require('./routes/RepRoutes');
const LicenseRoutes = require('./routes/LicenseRoutes');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
dbConnect();
const PORT = 3000;

app.use(body_parser.json());
app.use(cors({
 
 credentials: true,
 origin: "http://localhost:5173"

}));

app.use('/user', UserRoutes);
app.use('/license', LicenseRoutes);
app.use('/rep', RepRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
})