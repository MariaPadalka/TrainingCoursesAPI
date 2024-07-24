import dotenv from 'dotenv';
dotenv.config();

export default (app) => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        const serverUrl = `http://${process.env.URL}:${PORT}`;
        console.log(`Server started on port ${PORT}`);
        console.log(`API documentation available at ${serverUrl}/api-docs`);
    });
};
