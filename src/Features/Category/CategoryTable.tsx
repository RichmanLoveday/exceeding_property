import { Modal, Table } from "flowbite-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useRef, useState } from "react";
import CategoryTableHeader from "./CategoryTableHeader";
import DeleteComp from "@/components/ui/Delete";
import CategoryRow from "./CategoryRow";
import useCategoryDelete from "./useDeleteCategory";
import EditCategory from "./EditCategory";
import PaginationCounter from "@/components/ui/pagination";
import useCategoryPaginate from "./useCategoryPaginate";

function CategoryTable() {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFind, setCategoryFind] = useState({});
  const { category, error, loadingCatgory } = useCategoryPaginate(currentPage);
  const { categoryDelete, isDeleted, isDeleting } = useCategoryDelete();
  const [editForm, setEditForm] = useState(false);

  const categoryID = useRef("");

  const toatalPages = category?.totalPages;
  const categories = category?.categories;

  useEffect(() => {
    //? Clear category data and close edit form when modal is closed
    if (!openModal) {
      setCategoryFind({});
      setEditForm(false);
    }
  }, [openModal]);

  //? function to get a specific category ID
  function storeCategoryID(categoryId: string) {
    categoryID.current = categoryId;

    //? open modal
    setOpenModal(!openModal);
  }

  //? function to delete category
  function handleDeleteCategory() {
    categoryDelete(categoryID.current);
  }

  //? handle edit data
  function handleEditCategory(categoryId: string) {
    const categoryFind = category.find((ele) => ele._id == categoryId);

    //? store neccessary states
    setCategoryFind(categoryFind);
    setEditForm(!editForm);
    setOpenModal(!openModal);

    //? set the category ID on red
    categoryID.current = categoryId;
  }

  //? handle close modal func
  function handleCloseModal() {
    setOpenModal(false);
  }

  //? handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingCatgory)
    return <ClipLoader color="FFFFF" className="mt-[20%]" size={100} />;

  if (error) return <p className="mt-[10%]">Check your internet connection</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable className="mb-10">
          <CategoryTableHeader />
          <Table.Body>
            {categories?.length > 0
              ? categories
                  .reverse()
                  .map((category, index) => (
                    <CategoryRow
                      key={index}
                      index={index}
                      categoryID={category._id}
                      description={category.description}
                      createdAt={category.createdAt}
                      categoryName={category.name}
                      images={category.images}
                      storeCategoryID={storeCategoryID}
                      handleEditCategory={handleEditCategory}
                    />
                  ))
              : ""}
          </Table.Body>
        </Table>
        {category?.length == 0 ? (
          <p className="w-full text-center -mt-5 py-1">Category is empty</p>
        ) : (
          ""
        )}
      </div>

      <PaginationCounter
        count={toatalPages}
        handlePageChange={handlePageChange}
        currentpage={currentPage}
      />

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {editForm ? (
            <EditCategory
              category={categoryFind}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <DeleteComp
              message={"Are you sure you want to delete this category"}
              handleDelete={handleDeleteCategory}
              isDeleting={isDeleting}
              setOpenModal={setOpenModal}
              isDeleted={isDeleted}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CategoryTable;
