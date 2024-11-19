import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Replies from "./pages/Replies";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";

function App() {
  const user = useRecoilValue(userAtom);

  const { pathname } = useLocation();
  return (
    <>
      <div>
        <Container maxW={"90%"}>
          <Header />
        </Container>
        <Box position={"relative"} w={"full"}>
          <Container maxW={pathname === "/" ? "900px" : "680px"}>
            <Routes>
              <Route
                path="/"
                element={user ? <HomePage /> : <Navigate to="/auth" />}
              />
              <Route
                path="/auth"
                element={!user ? <AuthPage /> : <Navigate to="/" />}
              />
              <Route
                path="/update"
                element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
              />

              <Route
                path="/:username"
                element={
                  user ? (
                    <>
                      <UserPage />
                      <CreatePost />
                    </>
                  ) : (
                    <UserPage />
                  )
                }
              />

              <Route path="/:username/post/:pid" element={<PostPage />} />

              <Route
                path="/:username/replies"
                element={user ? <Replies /> : <Navigate to="/auth" />}
              />
              <Route
                path="/chat"
                element={user ? <ChatPage /> : <Navigate to="/auth" />}
              />
            </Routes>

            {user && <CreatePost />}
          </Container>
        </Box>
      </div>
    </>
  );
}

export default App;
