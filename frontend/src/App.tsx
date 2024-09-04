import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from "./pages/Form"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import MyForms from "./pages/MyForms"
import Appbar from "./components/Appbar"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Form /></ProtectedRoute>} />
          <Route path="/my-forms" element={<ProtectedRoute><MyForms /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
