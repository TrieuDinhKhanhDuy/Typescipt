import "./App.css";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Product from "./Type/Product";
import instance from "./api/instance";
function App() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products`);
      setProducts(data);
    })();
  }, []);
  const handleDeleteProduct = (id: number) => {
    (async () => {
      const cf = confirm("Are you sure you want to delete this product?");
      if (cf) {
        await instance.delete(`/products/${id}`);
        setProducts(products.filter((item) => item.id !== id && item));
      }
    })();
  };
  const handleAddProduct = (product :Product) => {
    (async () => {
      const {data} = await instance.post(`/products`,product)
      setProducts([...products,data])
      navigate("/products")
    })()
  }
  const handleEditProduct = (product :Product) => {
    (async () => {
      const {data} = await instance.put(`/products/${product.id}`,product)
      setProducts(products.map((item) => item.id === data.id ? data : item ))
      navigate("/products")
    })()
  }
  return (
    <>
      <Routes>
        <Route
          path="/products"
          element={<Home onDelete={handleDeleteProduct} product={products} />}
        ></Route>
        <Route path="/products/add" element={<Add onAdd = {handleAddProduct}/>}></Route>
        <Route path="/products/edit/:id" element={<Edit onEdit={handleEditProduct} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
