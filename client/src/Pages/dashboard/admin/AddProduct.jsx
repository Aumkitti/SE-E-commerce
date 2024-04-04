import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAxiosPbulic from "../../../hook/useAxiosPublic";

const AddProduct = () => {
  const axiosPublic = useAxiosPbulic();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/products");
        setCategories([...new Set(res.data.map((item) => item.category))]);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post("/products", product);
      Swal.fire({
        icon: "success",
        title: "Add Products Successfully",
        timer: "1500",
      });
      navigate("/dashboard/product");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add products!",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <p className="text-4xl font-semibold mb-10 mx-80 ml-5 ">
        Add A New <span className="text-red">Product Item</span>
      </p>
      <div className="px-2 space-y-10">
        <div className="space-y-2 mb-10 ">
          <p>Product Name*</p>
          <input
            name="name"
            type="text"
            placeholder="Enter Product Name"
            className="input input-bordered w-full rounded-md mt-2"
            onChange={handleInput}
            value={product.name}
          />
        </div>
        <div className="flex items-center space-x-8">
          <div className="w-full space-y-2">
            <p>Category*</p>
            <select
              name="category"
              className="select select-bordered w-full capitalize"
              onChange={handleInput}
              value={product.category}
            >
              {categories.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </select>
          </div>
          <div className="w-full space-y-2">
            <p>Price*</p>
            <input
              name="price"
              type="number"
              placeholder="Enter Price"
              className="input input-bordered w-full"
              onChange={handleInput}
              value={product.price}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p>Product Details</p>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Enter Product Details..."
            onChange={handleInput}
            value={product.description}
          ></textarea>
        </div>
        <div className="space-y-2">
          <p>Image URL*</p>
          <input
            name="image"
            type="text"
            placeholder="Enter Image URL"
            className="input input-bordered w-full"
            onChange={handleInput}
            value={product.image}
          />
        </div>
      </div>
      <button
        className="btn bg-red text-white mx-2 mt-4"
        onClick={handleAddProducts}
      >
        Add Item
        <MdSave />
      </button>
    </div>
  );
};

export default AddProduct;
