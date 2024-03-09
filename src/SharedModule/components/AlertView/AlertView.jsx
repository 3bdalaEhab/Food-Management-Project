import { Modal } from 'react-bootstrap';
import noData from "../../../assets/nodata.png";

export default function AlertView({ userInfo, detailsRecipe, categoryDetails }) {
    const category = categoryDetails?.category && categoryDetails.category[0];
    const tag = detailsRecipe?.tag;
    return (
        <>
            <Modal.Body className='overflow-hidden'>
                {userInfo ? (
                    <div>
                        <div className="img text-center mx-auto">
                            <img className='userImage' src={userInfo.imagePath ? `https://upskilling-egypt.com/${userInfo.imagePath}` : noData} alt='item' />
                        </div>
                        <div className="title text-center my-2 w-50 mx-auto my-4 pt-1 bg-dark text-white rounded-3 pt-1">
                            <h4>Details User</h4>
                        </div>
                        <div className="info d-flex text-success flex-wrap justify-content-around my-3">
                            <div>
                                <h6>UserName: <span className='text-black'>{userInfo.userName}</span></h6>
                                <h6>Email: <span className='text-black'>{userInfo.email}</span></h6>
                                <h6>PhoneNumber: <span className='text-black'>{userInfo.phoneNumber}</span></h6>
                            </div>
                            <div>
                                <h6>Id: <span className='text-black'>{userInfo.id}</span></h6>
                                <h6>Country: <span className='text-black'>{userInfo.country}</span></h6>
                            </div>
                        </div>
                    </div>
                ) : detailsRecipe ? (
                    <div>
                        <div className="img text-center mx-auto">
                            <img className='userImage' src={detailsRecipe.imagePath ? `https://upskilling-egypt.com/${detailsRecipe.imagePath}` : noData} alt='item' />
                        </div>
                        <div className="title text-center my-2 w-50 mx-auto my-4 pt-1 bg-dark text-white rounded-3 pt-1">
                            <h4>Recipe Details</h4>
                        </div>
                        <div className="info d-flex text-success flex-wrap align-items-center justify-content-around my-3">
                            <div>
                                <h6>Name: <span className='text-black'>{detailsRecipe.name}</span></h6>
                                <h6>Price: <span className='text-black'>{detailsRecipe.price} EGP</span></h6>
                                <h6>ID: <span className='text-black'>{detailsRecipe.id}</span></h6>
                            </div>
                            <div>
                                <h6>Category: <span className='text-black'>{ detailsRecipe?.category[0].name}</span></h6>
                                <h6>Tag: <span className='text-black'>{tag ? tag.name : ''}</span></h6>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="img text-center mx-auto">
                            <img className='userImage' src={categoryDetails.imagePath ? `https://upskilling-egypt.com/${categoryDetails.imagePath}` : noData} alt='item' />
                        </div>
                        <div className="title text-center my-2 w-50 mx-auto my-4 pt-1 bg-dark text-white rounded-3 pt-1">
                            <h4>Category Details</h4>
                        </div>
                        <div className="info text-success text-center my-3">
                            <div>
                                <h6>Name: <span className='text-black'>{categoryDetails.name}</span></h6>
                                <h6>ID: <span className='text-black'>{categoryDetails.id}</span></h6>
                            </div>
                        </div>
                    </div>
                )}

                {detailsRecipe && (
                    <div className="description mx-auto mb-4 text-center">
                        <h6 className='w-50 mx-auto my-4 pt-1 bg-dark text-white rounded-3 py-1'>Description</h6>
                        <span className='text-center'>{detailsRecipe.description}</span>
                    </div>
                )}
            </Modal.Body>
        </>
    );
}
