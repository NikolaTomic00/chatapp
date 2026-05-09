import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  // Daj mi iz store-a : checkAuth, isCheckingAuth, authUser. useAuthStore() - samo cita state!

  useEffect(() => {
    checkAuth(); // nakon svakog refresha treba da se proveri da li token pripada ulogovanom korisniku
  }, [checkAuth]); //jwt,session,cookie provera,Auth:set({ authUser: user }) ili null
  //[checkAuth] - efekat se izvrsi jednom, isto kao da je prazno [] al ovako se pise
  //useEffect - cim aplikacija startuje proveri da li ima validan login/session
  //DOk traje provera prikazuje se render , tek kad je false onda se prikazuje
  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} // ako user nije validan tj null je i dalje onda ga tera na login page
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;

/*    
    App start
↓
isCheckingAuth = true → PageLoader
↓
checkAuth() → API call
↓
backend proveri cookie/token
↓
authUser = user ili null
↓
isCheckingAuth = false → loader nestaje
↓
Routes odlučuju:
   - user → ChatPage
   - null → LoginPage
    
    */
