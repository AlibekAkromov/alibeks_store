
import express from 'express'
import usersRouter  from "./routes/users.js"
import categoryRouter  from "./routes/category.js"
import productRouter  from "./routes/product.js"
import {db} from "./db/index.js"
import config from  "./utils/config/config.js"

const app = express()


app.use(express.static('uploads'))
app.use(express.json());
app.use(usersRouter)
app.use(categoryRouter)
app.use(productRouter)

db()
app.listen(config.port , () => {
  console.log(`Server is running ${config.port}`);
});
  