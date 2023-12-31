import express from 'express';
import connectDB from './config/connection.js';
import routes from './routes/user-routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3018;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

app.use(errorHandler);

(async () => {
  try {
    await connectDB();
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(
        `Server listening on port ${PORT}. Access site at http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
})();
