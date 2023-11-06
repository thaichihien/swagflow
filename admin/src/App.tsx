import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Notfound from "./pages/Notfound"
import ProductList from "./pages/ProductList"
import AddProduct from "./pages/AddProduct"
import Playground from "./pages/Playground"
import ImportProducts from "./pages/ImportProducts"
import Login from "./pages/Login"
import ProtectedLayout from "./pages/Layout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedLayout></ProtectedLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/import" element={<ImportProducts />} />
            <Route path="/playground" element={<Playground />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
