import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCategory,
  editAdminCategory,
} from "../../../utils/config/axios.Methode.post";
import { addAdminCategory } from "../../../utils/api/api.Types";
import { admingetCategory } from "../../../utils/config/axios.Method.Get";
import { deleteAdminCategory } from "../../../utils/config/axios.Method.Delete";
import {
  CategoryValidate,
  categoryData,
} from "../../../utils/validations/categoryValidation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function AdminCategory() {
  const navigate = useNavigate();
  const { errors, handleSubmit, register, reset } = CategoryValidate();

  const [data, setData]: any = useState([]);

  const [editModalIndex, setEditModalIndex]: any = useState(null);
  const [editCategory, setEditCategory] = useState<any>({
    categoryName: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;
  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const page = Math.ceil(data.length / dataPerPage);
  const paginateddata = data.slice(firstIndex, lastIndex);
  const [deleted, setDeleted] = useState(false);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page != currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchData = async () => {
    try {
      const result: any = await admingetCategory();
      console.log(result.data.categoryDetails, "PPPP");
      setData(result.data.categoryDetails);
    } catch (error) {
      console.error("Error during admin get all tutors:", error);
    }
  };

  console.log(errors?.categoryName, "errorserrorserrors");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const openEditModal = (i: any) => {
    setEditModalIndex(i);
    setEditCategory({ categoryName: data[i].categoryName });
    setIsEditModal(true);
  };
  const closeEditModal = () => {
    setEditModalIndex(null);
    setIsEditModal(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = async (Data: categoryData) => {
    console.log("handleAddCategory");
    console.log(Data, "Data");
    closeModal();

    await addCategory({ ...Data }).then((response: any) => {
      if (response.status === 200) {
        toast.success(response.data.message);

        fetchData();

        navigate("/adminCategory");
      } else if (response.status === 400) {
        toast.error(response.data.error);
      } else {
        toast.error(response.data.error);
      }
    });
  };

  const handleEditCategory = async () => {
    const id = data[editModalIndex]._id;
    await editAdminCategory(editCategory, id).then((res: any) => {
      if (res.status === 200) {
        toast.success(res.data.message);

        fetchData();
        navigate("/adminCategory");
      } else {
        toast.error(res.response.data.error);
      }
    });
  };

  const handleDeleteCategory = async (_id: any) => {
    console.log("Deleting category with id:", _id);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this category. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res: any = await deleteAdminCategory(_id);

        console.log("Delete response:", res);

        if (res.status === 200) {
          navigate("/adminCategory");
          toast.success(res.data.message);
        } else {
          toast.error(res.response.data.error);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center flex-col">
        <table className="w-full lg:w-3/6 xl:w-2/2 bg-white border border-gray-300 rounded-md">
          <thead className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white">
            <tr>
              <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                Category Name
              </th>
              <th className="w-1/2 text-center py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginateddata
              .filter((category: any) => !category.isDeleted)
              .map((category: any, index: any) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="w-1/2 text-left py-3 px-4">
                    {category?.categoryName}
                  </td>
                  <td className="w-1/2 text-center py-6 px-4">
                    <button
                      onClick={() => openEditModal(index)}
                      className="px-5 py-2 bg-blue-500 text-white text-sm uppercase font-medium mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(data?.[index]?._id)}
                      className="px-5 py-2 bg-red-500 text-white text-sm uppercase font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <nav className="flex justify-start items-center rounded-lg space-x-2">
          <span
            className="text-black hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
            onClick={handlePrev}
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </span>
          {Array.from({ length: page }, (_, index) => (
            <span
              key={index + 1}
              className={`w-10 h-10 ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-teal-600"
              } p-4 inline-flex items-center text-sm font-medium rounded-full`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <span
            className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
            onClick={handleNext}
          >
            <span className="sr-only">Next</span>
            <span aria-hidden="true">»</span>
          </span>
        </nav>
      </div>

      {isEditModal && (
        <div
          className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
          style={{ background: "rgba(0,0,0,.7)" }}
          onClick={closeEditModal}
        >
          <div
            className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit(handleAddCategory)}>
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Edit Category</p>
                  <div
                    className="modal-close cursor-pointer z-50"
                    onClick={closeEditModal}
                  >
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                  </div>
                </div>
                <div className="my-5">
                  <input
                    onChange={(e) =>
                      setEditCategory({ categoryName: e.target.value })
                    }
                    value={editCategory.categoryName}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your text here"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      closeEditModal(); 
                    }}
                    className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleEditCategory();
                      closeEditModal(); 
                    }}
                    type="submit"
                    className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>
        {`
          .animated {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          .animated.faster {
            -webkit-animation-duration: 500ms;
            animation-duration: 500ms;
          }
          .fadeIn {
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
          }
          .fadeOut {
            -webkit-animation-name: fadeOut;
            animation-name: fadeOut;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="mt-4">
        <button
          type="button"
          onClick={openModal}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... hover:from-pink-500 hover:to-yellow-500 ... text-white px-14 py-1 rounded font-semibold text-sm uppercase"
        >
          Add Category
        </button>
      </div>

      {isModalOpen && (
        <div
          className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
          style={{ background: "rgba(0,0,0,.7)" }}
          onClick={closeModal}
        >
          <div
            className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit(handleAddCategory)}
              className="modal-content py-4 text-left px-6"
            >
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Add Category</p>
                <div
                  className="modal-close cursor-pointer z-50"
                  onClick={closeModal}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              <div className="my-5">
                <input
                  type="text"
                  {...register("categoryName")}
                  className={`w-full px-4 py-2 border ${
                    errors.categoryName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your text here"
                />
                {errors.categoryName && (
                  <p className="text-red-500 text-sm">
                    {errors.categoryName?.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    closeModal(); 
                    reset(); 
                  }}
                  type="button"
                  className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCategory;
