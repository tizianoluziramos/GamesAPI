import './utils/Logger';
require("@dotenvx/dotenvx").config();
import app from "./app";
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
});
