import React, { useEffect, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import Header from '../../../SharedModule/components/Header/Header';
import HeaderTable from '../../../SharedModule/components/HeaderTable/HeaderTable';
import NoData from '../../../SharedModule/components/NoData/NoData';
import { apiDeleteUsersList, apiGetUsersList } from './apiUserList';
import AlertDelete from '../../../SharedModule/components/AlertDelete/AlertDelete';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import AlertView from '../../../SharedModule/components/AlertView/AlertView';
import Pagination from '../../../SharedModule/components/Pagination/Pagination';
import avatar from "../../../assets/images.png";

export default function UserList() {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [rolesSearch, setRolesSearch] = useState("");
  const [pagesArray, setPagesArray] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  // Function to fetch users list
  async function getUsersList(pageNum, name, email, roles) {
    try {
      const { data } = await apiGetUsersList(pageNum, name, email, roles);
      setUsersList(data.data);
      setPagesArray(Array(data?.totalNumberOfPages).fill().map((_, i) => i + 1));
      setTotalNumberOfPages(data?.totalNumberOfPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  }

  // Initial data fetch on component mount
  useEffect(() => {
    getUsersList(1, nameSearch, emailSearch, rolesSearch);
  }, [nameSearch, emailSearch, rolesSearch]);

  // Function to handle delete button click
  async function handleDeleteButtonClick() {
    try {
      const data = await apiDeleteUsersList(userIdToDelete);
      if (data) {
        setShowDeleteModal(false);
        getUsersList(1, nameSearch, emailSearch, rolesSearch);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // Function to handle input change events
  function handleNameInputChange(event) {
    setNameSearch(event.target.value);
  }

  function handleEmailInputChange(event) {
    setEmailSearch(event.target.value);
  }

  function handleRolesInputChange(event) {
    setRolesSearch(event.target.value);
  }

  // Function to show delete modal
  function handleShowDeleteModal(userId) {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  }

  // Function to hide delete modal
  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  // Function to show view modal
  function handleShowViewModal(user) {
    setUserInfo(user);
    setShowViewModal(true);
  }

  // Function to hide view modal
  function handleCloseViewModal() {
    setShowViewModal(false);
  }

  return (
    <>
      <Header imag={5} word={"List"} paragraph={"You can now add your items that any user can order it from the Application and you can edit"} title={"Users"} />
      <HeaderTable Title={"Users Table Details"} />
      <div className="row my-3 gap-3 justify-content-center mt-5">
        <div className="col-md-6">
          <input onChange={handleNameInputChange} type="text" className="form-control" placeholder="Search By Name" />
        </div>
        <div className="col-md-3">
          <input onChange={handleEmailInputChange} type="email" className="form-control" placeholder="Search By Email" />
        </div>
        <div className="col-md-2">
          <select onChange={handleRolesInputChange} className="form-control">
            <option value={""}>All Roles</option>
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className='h3 vh-100 mt-5 d-flex justify-content-center pt-5'>
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="container-fluid d-flex justify-content-center m-0 p-0">
            {usersList.length > 0 ? (
              <div className="table-responsive w-100">
                <table className='w-100 table text-center'>
                  <thead className='rounded-4 p-4'>
                    <tr>
                      <th>UserName</th>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user) => (
                      <tr key={user.id}>
                        <td>{user.userName}</td>
                        <td>{user.id}</td>
                        <td>{user.imagePath ? <img className='userImage' src={`https://upskilling-egypt.com/${user.imagePath}`} alt='item' /> : <img className='userImage rounded-circle' src={avatar} alt="noImageUser" />}</td>
                        <td>{user.email}</td>
                        <td>
                          <div className='d-flex justify-content-center gap-3'>
                            <button onClick={() => handleShowViewModal(user)} className="dropdown-item updateAndDelete">
                              <i className="fa-solid fa-eye me-1 text-success"></i>View
                            </button>
                            <button onClick={() => handleShowDeleteModal(user.id)} className="dropdown-item updateAndDelete">
                              <i className="fa-solid fa-trash-can me-1 text-danger"></i>Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData world={"Delete This User ?"} />
            )}
          </div>
        </>
      )}
      {totalNumberOfPages > 1 ? (
        <div className=" my-3 mx-auto text-center d-flex justify-content-center">
          <Pagination totalNumberOfPages={totalNumberOfPages} anyFunction={getUsersList} pagesArray={pagesArray} nameSearch={nameSearch} emailSearch={emailSearch} rolesSearch={rolesSearch} setPagesArray={setPagesArray} />
        </div>
      ) : ("")}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Link onClick={handleCloseDeleteModal} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
        < AlertDelete functionDelete={handleDeleteButtonClick} world={"Delete This User ?"} />
      </Modal>
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Link onClick={handleCloseViewModal} className="ms-auto m-2 text-danger h4 fa-regular fa-circle-xmark"></Link>
        < AlertView userInfo={userInfo} />
      </Modal>
    </>
  );
}
