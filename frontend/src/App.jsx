import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Replies from "./pages/Replies";

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
            <Route path="/:username/replies" element={<Replies />} />
          </Routes>
        </Container>
        <Toaster position="top-left" />
      </div>
    </>
  );
}

export default App;
