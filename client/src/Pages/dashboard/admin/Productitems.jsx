import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPbulic from "../../../hook/useAxiosPublic";

const Productitems = () => {
  const axiosPublic = useAxiosPbulic();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ใช้ useEffect เพื่อโหลดรายการสินค้าเมื่อคอมโพเนนต์ถูกโหลดเข้ามา
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axiosPublic.get("/products");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // คำนวณหน้าที่แสดงข้อมูล
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // ฟังก์ชันสำหรับลบสินค้า
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/products/${_id}`);
          if (response.status === 200) {
            setItems(items.filter((item) => item._id !== _id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  return (
    <div>
      {/* หัวข้อหน้า */}
      <div>
        <p className="text-4xl font-semibold mb-8 mx-80">
          Manage All <span className="text-red">Product Items!</span>
        </p>
      </div>
      <div>
        {/* ตารางแสดงข้อมูลสินค้า */}
        <div className="overflow-x-auto">
          <table className="table table-zebra ">
            {/* ส่วนหัวตาราง */}
            <thead>
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th className="text-center ">Update</th>
                <th className="text-center ">Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* แสดงข้อมูลสินค้าในแต่ละแถว */}
              {currentItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>
                      <label>{index + 1 + indexOfFirstItem}</label>
                    </th>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>฿{item.price}</td>
                    <th className="text-center ">
                      {/* ปุ่มแก้ไขสินค้า */}
                      <Link
                        to={`/dashboard/updateproduct/${item._id}`}
                        className="btn btn-ghost"
                      >
                        <BiSolidEdit className="text-white bg-orange-500 w-7 h-7 rounded-md" />
                      </Link>
                    </th>
                    <th className="text-center ">
                      {/* ปุ่มลบสินค้า */}
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDelete(item._id)}
                      >
                        <RiDeleteBin6Line className="text-red w-7 h-7" />
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* แสดงปุ่มเปลี่ยนหน้า */}
        <div className="pagination mt-4 flex justify-center items-center space-x-2">
          <button
            className="btn bg-red text-white"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Previous
          </button>
          <button
            className="btn bg-red text-white"
            onClick={handleNextPage}
            disabled={indexOfLastItem >= items.length}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productitems;
