import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const user = useRecoilValue(userAtom);
  // console.log(user);
  return (
    <>
      <div>
        <Container maxW={"90%"}>
          <Header />
        </Container>
        <Container maxW="680px">
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
              element={user ? <UserPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/:username/post/:pid"
              element={user ? <PostPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/:username/replies"
              element={user ? <Replies /> : <Navigate to="/auth" />}
            />
          </Routes>

          {user && <CreatePost />}
        </Container>
      </div>
    </>
  );
}

export default App;
