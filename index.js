//api documentation
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from "swagger-jsdoc";

//package
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
//security package
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
//files
import connectBD from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

//config
dotenv.config();

//mongodb_connect
connectBD();


//api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "job board ",
            description: "job portal application",
        },
        servers: [
            {
                url: "http://locahost:5000",
                description: "local api server"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

const corsOptions = {
    origin: 'http://localhost:5000/api-doc/#/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization'
};

const spec = swaggerDoc(options)


//object
const app = express();


//middlewares
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:5000"],
        scriptSrc: ["'self'", "https://unpkg.com"],
        styleSrc: ["'self'", "https://unpkg.com", "'sha256-abc123...'"]
    }
}));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors(corsOptions));

app.use(morgan('dev'));


//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);


//homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));


//validation middleware
app.use(errorMiddleware);


//port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running--${process.env.DEV_MODE} and port no ${PORT}`.bgCyan.white);
});