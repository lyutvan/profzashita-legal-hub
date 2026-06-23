import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMetrika, setupMetrikaGoals } from "./lib/metrika";

// Инициализация Яндекс Метрики (только в production)
initMetrika();
setupMetrikaGoals();

hydrateRoot(document.getElementById("root")!, <App />);
