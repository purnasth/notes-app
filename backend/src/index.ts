import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";
import requestLogger from "./middleware/requestLogger";

dotenv.config();

const app = express();

// Apply security headers using Helmet
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP if using inline styles/scripts
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resources
    referrerPolicy: { policy: "no-referrer" }, // Hide referrer info
    xDnsPrefetchControl: { allow: false }, // Disable DNS prefetch
  })
);

// app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // Log all requests

// Setup Swagger API documentation
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// After all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
