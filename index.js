import 'dotenv/config'
import cors from "cors"
import express from "express"
import connectDB from "./config/db.js"
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes
import webhookRoutes from "./routes/webhook.js"
import adminRoutes from "./routes/admin.js"
import studentRoutes from "./routes/student.js"
import teacherRoutes from "./routes/teacher.js"
import webRoutes from "./routes/web.js"
import testRoutes from "./routes/test.js"

// Connect DB
connectDB()

const app = express()

// Middleware
const corsOptions = { origin: '*' }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ limit: "60mb", extended: true }))
app.use(fileUpload())

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/api/webhook", webhookRoutes)
app.use("/api/web", webRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/teacher", teacherRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/test", testRoutes)

app.get("/", (_, res) => res.send('Bruce LMS server live!'))

// 🚫 NO app.listen()
// ✅ Export app for Vercel
export default app
