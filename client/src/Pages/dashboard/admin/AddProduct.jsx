import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAxiosPbulic from "../../../hook/useAxiosPublic";

// การ import และการใช้งาน hook และ component ต่างๆ

const AddProduct = () => {
  // การใช้ hook useState เพื่อเก็บค่าสถานะของสินค้าที่กำลังจะเพิ่ม
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // การใช้ hook useState เพื่อเก็บค่าของหมวดหมู่สินค้า
  const [categories, setCategories] = useState([]);

  // การใช้ hook useNavigate สำหรับการเปลี่ยนเส้นทางใน React Router
  const navigate = useNavigate();

  // การใช้ hook useEffect เพื่อโหลดข้อมูลหมวดหมู่สินค้าเมื่อคอมโพเนนต์นี้ถูกโหลดเข้ามา
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

  // ฟังก์ชัน handleInput เพื่อจัดการการเปลี่ยนแปลงค่าใน input fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชัน handleAddProducts เพื่อจัดการการเพิ่มสินค้าใหม่
  const handleAddProducts = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post("/products", product);
      // แสดง toast notification เมื่อเพิ่มสินค้าสำเร็จ
      Swal.fire({
        icon: "success",
        title: "Add Products Successfully",
        timer: "1500",
      });
      // เปลี่ยนเส้นทางไปยังหน้ารายการสินค้าหลังจากเพิ่มสินค้าเรียบร้อย
      navigate("/dashboard/product");
    } catch (error) {
      // แสดง toast notification เมื่อเกิดข้อผิดพลาดในการเพิ่มสินค้า
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
      {/* ส่วนของหัวเรื่อง */}
      <p className="text-4xl font-semibold mb-10 mx-80 ml-5 ">
        Add A New <span className="text-red">Product Item</span>
      </p>
      {/* ส่วนของฟอร์มเพิ่มสินค้า */}
      <div className="px-2 space-y-10">
        {/* ช่องกรอกชื่อสินค้า */}
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
        {/* เลือกหมวดหมู่สินค้า */}
        <div className="flex items-center space-x-8">
          <div className="w-full space-y-2">
            <p>Category*</p>
            <select
              name="category"
              className="select select-bordered w-full capitalize"
              onChange={handleInput}
              value={product.category}
            >
              {/* แสดงตัวเลือกของหมวดหมู่สินค้า */}
              {categories.map((category, index) => {
                return <option key={index}>{category}</option>;
              })}
            </select>
          </div>
          {/* ช่องกรอกราคา */}
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
        {/* ช่องกรอกรายละเอียดสินค้า */}
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
        {/* ช่องกรอก URL รูปภาพสินค้า */}
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
      {/* ปุ่มเพิ่มสินค้า */}
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
