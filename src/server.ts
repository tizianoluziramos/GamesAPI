import path from "path";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
