import express from "express";
import cors from "cors";
import agentRouter from "./routes/agentRoute";
import propertyRouter from "./routes/propertyRoute";
import clientRouter from "./routes/clientRoute";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_SERVER_URL }));

app.use(express.json());
app.use("/api/agents", agentRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/clients", clientRouter);

export default app;
