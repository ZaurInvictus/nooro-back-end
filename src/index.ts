import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(taskRoutes);
app.use(errorHandler);


app.listen(PORT, () => console.log(`\n** Server is running on port ${PORT} **\n`))
