import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import Playground from "./pages/Playground"
import Authentication from "./pages/Authentication"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Authentication />}/>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/playground" element={<Playground />} />
          </Route>

          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
