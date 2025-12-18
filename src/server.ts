import './utils/Logger';
import './config/envLoader';
import app from "./app";

app.listen(process.env.PORT || 3000, async () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});