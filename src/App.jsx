import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div>
        <Container maxW={"90%"}>
          <Header />
        </Container>
        <Container maxW="680px">
          <Routes>
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
