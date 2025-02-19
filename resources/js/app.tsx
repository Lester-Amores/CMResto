import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.css";

const App = () => {
    return <h1 className="text-3xl font-bold text-center">Hello from React + Tailwind!</h1>;
};

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);
