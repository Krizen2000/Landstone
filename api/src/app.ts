import express from "express";
import cors from "cors";
import agentRouter from "./routes/agentRoute";
import propertyRouter from "./routes/propertyRoute";
import clientRouter from "./routes/clientRoute";
import newsEmailRouter from "./routes/newsEmailRoute";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/agents", agentRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/clients", clientRouter);
app.use("/api/newsEmail", newsEmailRouter);

export default app;
