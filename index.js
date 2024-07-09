import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js"; // Ensure you add the .js extension
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import teacherRoutes from "./routes/teacher.rt.js";
import groupRoutes from "./routes/group.rt.js";
import loadRoutes from "./routes/load.rt.js";
import subjectRoutes from "./routes/subject.rt.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}${process.env.MONGODB_NAME}`, {
  // useNewUrlParser and useUnifiedTopology are now default settings
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Use routes
app.use("/teachers", teacherRoutes);
app.use("/groups", groupRoutes);
app.use("/loads", loadRoutes);
app.use("/subjects", subjectRoutes);

// Add Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  const serverUrl = `http://${process.env.URL}:${PORT}`;
  console.log(`Server started on port ${PORT}`);
  console.log(`API documentation available at ${serverUrl}/api-docs`);
});
