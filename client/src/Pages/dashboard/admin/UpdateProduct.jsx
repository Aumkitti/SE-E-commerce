import React, { useState, useEffect } from "react";
import { MdSave } from "react-icons/md";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const UpdateProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams(); // ดึงพารามิเตอร์ id จาก URL
  const [items, setItems] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // ใช้ useEffect เพื่อโหลดข้อมูลสินค้าที่ต้องการแก้ไข
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get(`/products/${id}`);
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]); // เมื่อ id เปลี่ยนแปลงจะทำการโหลดข้อมูลใหม่

  const handleChange = (e) => {
    // ฟังก์ชันสำหรับการเปลี่ยนแปลงข้อมูลในฟอร์ม
    setItems((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateItem = async (e) => {
    // ฟังก์ชันสำหรับการอัปเดตข้อมูลสินค้า
    e.preventDefault();
    try {
      await axiosPublic.put(`/products/${id}`, items); // ส่งข้อมูลสินค้าที่แก้ไขไปยังเซิร์ฟเวอร์
      Toast.fire({
        icon: "success",
        title: "Update Product Item Successfully",
      }); // แสดง Toast แจ้งเตือนการอัปเดตสำเร็จ
      navigate("/dashboard/product"); // เมื่ออัปเดตสำเร็จ ให้เปลี่ยนเส้นทางไปยังหน้าสินค้า
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // กำหนด Toast สำหรับแสดงผลการอัปเดต
  const Toast = Swal.mixin({
    toast: true,
    position: "top-center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <div>
      {/* หัวข้อหน้า */}
      <p className="text-4xl font-semibold mb-8 mx-80 ml-10">
        Update <span className="text-red">Menu Item</span>
      </p>
      {/* ฟอร์มแก้ไขข้อมูลสินค้า */}
      <div className="px-2 space-y-8">
        <div className="space-y-2 mb-14">
          <p>Product name*</p>
          <input
            name="name"
            type="text"
            placeholder="Product name"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={items.name}
          />
        </div>
        <div className="flex items-center space-x-8">
          <div className="w-full space-y-2">
            <p>Category*</p>
            <input
              name="category"
              type="text"
              placeholder="category"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={items.category}
            />
          </div>
          <div className="w-full space-y-2">
            <p>Price*</p>
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={items.price}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p>Product Details</p>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Product Details..."
            onChange={handleChange}
            value={items.description}
          ></textarea>
        </div>
        <div className="space-y-2">
          <p>Image URL*</p>
          <input
            name="image"
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={items.image}
          />
        </div>
      </div>
      {/* ปุ่มอัปเดตสินค้า */}
      <button
        className="btn bg-red text-white mx-2 mt-4"
        onClick={handleUpdateItem}
      >
        Update Item <MdSave />
      </button>
    </div>
  );
};

export default UpdateProduct;
