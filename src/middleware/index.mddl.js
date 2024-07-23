import bodyParser from 'body-parser';
import cors from 'cors';

export default (app) => {
    // Middleware
    app.use(bodyParser.json());
    const clientUrl = `http://${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`;
    app.use(
        cors({
            origin: clientUrl, // Replace with your frontend's URL
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true, // Enable if your backend needs to accept cookies from the frontend
            optionsSuccessStatus: 204,
        })
    );
};
