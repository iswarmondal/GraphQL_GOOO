import { Route, Router, Routes } from "react-router-dom";
import Character from "./pages/Character";
import CharactersList from "./pages/CharactersList";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/who-is-this/:id" element={<Character />} />
      </Routes>
    </>
  );
}

export default App;
