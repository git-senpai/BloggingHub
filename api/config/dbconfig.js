const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    await mongoose.connect(
      "mongodb+srv://lionelsatyamcr7:rVoKFQ5NnmYhWcWI@cluster0.kx0pg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
}

dbConnect().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

module.exports = { dbConnect };