import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" Component={SignIn} />
        <Route path="/" Component={ChatBox} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
