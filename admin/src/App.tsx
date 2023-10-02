import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Notfound from "./pages/Notfound"
import ProductList from "./pages/ProductList"
import AddProduct from "./pages/AddProduct"
import Playground from "./pages/Playground"
import ImportProducts from "./pages/ImportProducts"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/import" element={<ImportProducts/>}/>
            <Route path="/playground" element={<Playground/>}/>

            {/* <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/playground" element={<Playground />} /> */}
          </Route>
          <Route path="*" element={<Notfound/>} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
