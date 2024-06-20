import { Route, Routes } from "react-router-dom";
import Landingpage from './pages/LandingPage/Landingpage'
import Header from "./components/Header/Header";
import MenuDetails from "./pages/MenuDetails/MenuDetails";


function App() {
  

  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={ <Landingpage />} />
          {/* <Route path ="/menu/:id" element={<MenuDetails />} /> */}
        </Routes>

    </>
  )
}

export default App
