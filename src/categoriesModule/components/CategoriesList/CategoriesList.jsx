import React, { useEffect, useState } from 'react';
import Header from '../../../SharedModule/components/Header/Header';
import { apiAddCategories, apiDeleteCategories, apiShowCategories, apiUpdateCategories } from './apiCategories';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import HeaderTable from '../../../SharedModule/components/HeaderTable/HeaderTable';
import NoData from '../../../SharedModule/components/NoData/NoData';
import AlertDelete from '../../../SharedModule/components/AlertDelete/AlertDelete';
import AlertView from '../../../SharedModule/components/AlertView/AlertView';
import Pagination from '../../../SharedModule/components/Pagination/Pagination';

export default function CategoriesList() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showView, setShowView] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [nameSearch, setNameSearch] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pagesArray, setPagesArray] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    getCategories(1, nameSearch);
  }, [nameSearch]);
  async function sendDataToAddCategories() {
    try {
      const data = await apiAddCategories({ name: categoryName });
      if (data) {
        handleCloseAdd();
        getCategories(1, nameSearch);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }

  async function getCategories(pageNum, nameSearch) {
    try {
      setIsLoading(true);
      const { data } = await apiShowCategories(pageNum, nameSearch);
      if (data) {
        setCategories(data?.data);
        setTotalNumberOfPages(data?.totalNumberOfPages);
        setIsLoading(false);
        setPagesArray(Array(data?.totalNumberOfPages).fill().map((_, i) => i + 1));
      }
    } catch (error) {
      console.error('Error getting categories:', error);
      setIsLoading(false);
    }
  }

  async function callApiDeleteCategory() {
    try {
      const data = await apiDeleteCategories(categoryId);
      if (data) {
        handleCloseDeleteAlert();
        getCategories(1, nameSearch);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  async function callApiUpdateCategory() {
    try {
      const categoryData = { name: categoryName };
      const data = await apiUpdateCategories(categoryData, categoryId);
      if (data) {
        handleCloseUpdateAlert();
        getCategories(1, nameSearch);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  }

  const handleCloseAdd = () => {
    setShowAdd(false);
    setCategoryName('');
  };

  const handleCloseUpdateAlert = () => {
    setShowUpdate(false);
    setCategoryName('');
  };

  const handleCloseDeleteAlert = () => setShowDelete(false);

  function getNameValue(value) {
    setNameSearch(value.target.value);
  }

  return (
    <>
      <Header imag={5} word={'items'} paragraph={'You can now add your items that any user can order it from the Application and you can edit'} title={'Categories'} />
      <div className="categories-container">
        <HeaderTable Title={'Categories Table Details'} Details={'You can check all details'} ButtonTitle={'Add New Category'} ButtonFunction={() => setShowAdd(true)} />
        <div className="row my-3">
          <div className="col-md-4 mx-auto"><input onChange={getNameValue} type="text" className="form-control border-2 border-success" placeholder="Search By Name" /></div>
        </div>

        {isLoading ? (
          <div className='h3 vh-100 mt-5 d-flex justify-content-center pt-5 '>
            <Watch visible={true} height="80" width="80" radius="48" color="#4fa94d" ariaLabel="watch-loading" wrapperStyle={{}} wrapperClass="" />
          </div>
        ) : (
          <div className="container-fluid d-flex justify-content-center m-0 p-0">
            {categories?.length > 0 ? (
              <div className="table-responsive w-100  ">
                <table className=' w-100    table text-center'>
                  <thead className='  rounded-4 p-4'>
                    <tr>
                      <th>#indx</th>
                      <th>Item Name</th>
                      <th>ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((item, indx) => (
                      <tr key={item.id}>
                        <td>{indx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <td className=''>
                          <div className='d-flex justify-content-center gap-3'>
                            <button onClick={() => { setCategoryDetails(item); setShowView(true); }} className="dropdown-item updateAndDelete">
                              <i className="fa-solid fa-eye me-1 text-success"></i>View
                            </button>
                            <button onClick={() => { setShowUpdate(true); setCategoryName(item.name); setCategoryId(item.id); }} className="dropdown-item updateAndDelete">
                              <i className="fa-solid fa-pen-to-square  text-success"></i>Update
                            </button>
                            <button onClick={() => { setShowDelete(true); setCategoryId(item.id); }} className="dropdown-item updateAndDelete">
                              <i className="fa-solid fa-trash-can  text-danger"></i>Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData world={'No Data !'} />
            )}
          </div>
        )}

        {totalNumberOfPages > 1 && (
          <div className=" my-3 mx-auto text-center d-flex justify-content-center">
            <Pagination totalNumberOfPages={totalNumberOfPages} anyFunction={getCategories} pagesArray={pagesArray} nameSearch={nameSearch} />
          </div>
        )}

        <Modal show={showAdd} onHide={handleCloseAdd} centered>
          <Modal.Header >
            <Modal.Title>Add Category🖤</Modal.Title>
            <Link onClick={handleCloseAdd} className="text-danger h4 fa-regular fa-circle-xmark"></Link>
          </Modal.Header>
          <Modal.Body>
            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} maxLength={20} minLength={3} className='form-control my-3' type="text" placeholder='Category Name ' />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" className='btn bg-btn border-0' onClick={sendDataToAddCategories}>Save</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDelete} onHide={handleCloseDeleteAlert} centered>
          <Link onClick={handleCloseDeleteAlert} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
          <AlertDelete world={'Delete This Category ?'} functionDelete={callApiDeleteCategory} />
        </Modal>

        <Modal show={showUpdate} onHide={handleCloseUpdateAlert} centered>
          <Modal.Header>
            <Modal.Title> Update Category Name 🛠</Modal.Title>
            <Link onClick={handleCloseUpdateAlert} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} maxLength={20} minLength={3} className='form-control my-3' type="text" placeholder='Category Name ' />
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn-Update' onClick={callApiUpdateCategory}>Update this item</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showView} onHide={() => setShowView(false)} centered>
          <Link onClick={() => setShowView(false)} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
          <AlertView categoryDetails={categoryDetails} />
        </Modal>
      </div>
    </>
  );
}
