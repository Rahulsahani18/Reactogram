import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./profile.css";
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import  {API_URL} from '../config';
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const [image, setImage]=useState({
    preview:' ',
    data:' '
  })
const [caption, setCaption]=useState('');
const [location, setLocation]=useState('');
const [allMyPosts, setAllMyPosts]=useState([]);
const [postDetails, setPostDetails]=useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () =>{
    setShowPost(false);
    setImage('')
  } 
  const handleShowPost = () => setShowPost(true);

  const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "authorization":"Bearer " + localStorage.getItem('token')
    }
  }

  const handleImgSubmit=(e)=>{
   const img={
    preview:URL.createObjectURL(e.target.files[0]),
    data:e.target.files[0]
   } 
   setImage(img);
  }

  const handleImgUpload = async () => {
    try {
      let formData = new FormData();
      formData.append('file', image.data);
      const response = await axios.post(`${API_URL}/api/upload/uploadFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      return response;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };
  
  const getMyAllPosts=async()=>{
    const response= await axios.get(`${API_URL}/api/posts/myallposts`, CONFIG_OBJ);
    
    
    if(response.status===200){
        setAllMyPosts(response.data.posts)
    }
    else{
        swal.fire({
            icon: 'error',
            title: 'Some error occurred!',
          });
    }
  }

const showDetails=(post)=>{
    setPostDetails(post)
}

  const addPost = async () => {
    if (image.preview === '' || caption === '' || location === '') {
      swal.fire({
        icon: 'error',
        title: 'All fields are mandatory',
      });
    } else {
      try {
       
        const imgRes = await handleImgUpload();
        const request = {
          description: caption,
          location: location,
          Image: `${API_URL}/api/upload/files/${imgRes.data.fileName}`,
        };
        const PostResponse = await axios.post(`${API_URL}/api/posts/createpost`, request, CONFIG_OBJ);
        if (PostResponse.status === 201) {
          
          navigate('/posts');
        } else {
          swal.fire({
            icon: 'error',
            title: 'Some error occurred!',
          });
        }
      } catch (error) {
        console.error('Post creation failed:', error);
      }
    }
  };

  const deletePost = async (postId) => {
    // Show a confirmation dialog
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
        if (result.isConfirmed) {
            // If the user confirms, proceed with the deletion
            try {
                const response = await axios.delete(`${API_URL}/api/posts/delete/${postId}`, CONFIG_OBJ);
                if (response.status === 200) {
                    // Refresh posts after deletion
                    
                    getMyAllPosts();
                    handleClose();
                    // Show success message
                    swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    );
                }
            } catch (error) {
                // Handle error if the delete request fails
                swal.fire(
                    'Error!',
                    'There was a problem deleting your post.',
                    'error'
                );
            }
        } else {
            // If the user cancels, show a cancellation message
            swal.fire(
                'Cancelled',
                'Your post is safe :)',
                'info'
            );
        }
    });
};

useEffect(()=>{
  getMyAllPosts()
},[])

  return (
    <div className="container shadow mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            className="profile-pic p-3"
            alt="profile pic"
            src="https://media.istockphoto.com/id/1438437093/photo/young-adult-woman-in-studio-shots-making-facial-expressions-and-using-fingers-and-hands.webp?b=1&s=170667a&w=0&k=20&c=s64r95WyPrrg3nEc8X33TqYKIyJiyrj2tu4dRUds_-Y="
          />
          <p className="fw-bold fs-6 ms-3  profile-Bio">{user.user.email}</p>
          <p className="ms-3 profile-Bio">{user.user.fullName}</p>
          <p className="ms-3  profile-Bio">
            ui/ux designer <a href="#">@eduonix</a> | Follow{" "}
            <a href="#">@{user.user.fullName}</a>
          </p>
          <p className="ms-3  profile-Bio">
            My portfolio on <a href="#">dribbble.com/{user.user.fullName}</a>
          </p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-equal mt-3 mx-auto">
            <div className="text-center fs-6 fw-bold pe-4 count-section">
              <h5>{allMyPosts.length}</h5>
              <p>Posts</p>
            </div>
            <div className="text-center fs-6 fw-bold px-4 count-section">
              <h5>20</h5>
              <p>Following</p>
            </div>
            <div className="text-center fs-6 fw-bold ps-4">
              <h5>20</h5>
              <p>Followers</p>
            </div>
          </div>
          <div className=" mb-md-4 mt-4 d-flex justify-content-center">
            <button type="submit" className="custom-btn-white me-3 shadow-sm">
              <span className="fs-6 p-2">Edit Profile</span>
            </button>
            <button
              type="submit"
              className="custom-btn-white shadow-sm "
              onClick={handleShowPost}
            >
              <span className="fs-6">Upload Posts</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 my-2">
          <hr />
        </div>
      </div>
      <div className="row mb-md-4 profile-post1">
        {allMyPosts.map((post)=>{
          return(<div className="col-md-4 mt-2 pb-3 col-sm-12">
          <div className="card " onClick={handleShow}>
            <img
              onClick={()=>showDetails(post)}
              src={post.Image}
              className="card-img-top"
              alt="photos"
            />
          </div>
          </div>)
        })}
       
        
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div>
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={postDetails.Image}
                        className="d-block w-100"
                        alt="Your Post Picture"
                      />
                    </div>

                </div>
              </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <img
                    className="post-profile-pic p-2"
                    alt="profile pic"
                    src="https://media.istockphoto.com/id/1438437093/photo/young-adult-woman-in-studio-shots-making-facial-expressions-and-using-fingers-and-hands.webp?b=1&s=170667a&w=0&k=20&c=s64r95WyPrrg3nEc8X33TqYKIyJiyrj2tu4dRUds_-Y="
                  />
                  <div className="mt-2">
                    <p className="fs-600 fw-bold">{postDetails.location}</p>
                    <p className="sub-title">{postDetails.description}</p>
                  </div>

                  <div className="dropdown " style={{ marginLeft: "5rem" }}>
                    <a type="button" className="btn " data-bs-toggle="dropdown">
                      <i className="fa-solid fa-ellipsis fs-4 "></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-regular fa-pen-to-square px-2"></i>
                          Edit
                        </a>
                      </li>
                      <li>
                        <a onClick={()=>deletePost(postDetails._id)} className="dropdown-item" href="#">
                          <i  className="fa-solid fa-trash-can px-2"></i>Delete
                          Post
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-12 ms-md-2 ">
                    <span className="text-muted post-time ">2 Houres</span>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-12 ms-2 mt-2"
                    style={{ marginLeft: "11px" }}
                  >
                    <p>Lorem Ipsum</p>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6 lcs-icon ">
                    <i className=" fs-5 ps-2 fa-regular fa-heart"></i>
                    <i className="fs-5 ps-3 fa-regular fa-comment"></i>
                    <i className="fs-5 ps-3 fa-regular fa-paper-plane"></i>
                  </div>
                  <div className="col-md-12 ms-2 mt-2">
                    <span className="fw-bold likes fs-6 ">200 Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showPost} onHide={handleClosePost} size="lg">
        <Modal.Header closeButton >
          <span className="fs-6 fw-bold">Upload Posts</span>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12">
            
              <div className="upload-post">
              
                <div className="dropContainer">  
                  
                  <input type="file" className="fileUpload" accept=".jpg, .png, .gif" onChange={(e)=>handleImgSubmit(e)}/>
                  </div>
                  <div className="upload-icon-container">
                 
                  <span className="upload-icon"><i className="fa-solid fa-cloud-arrow-up fs-4"></i></span>
                  <br/>
                
                  <span style={{color:"blue"}}>Upload File From Computer</span>
                  </div>
                 
                  <div className=" overflow-hidden mx-auto text-center " style={{width:"17rem",height:"16rem"}}>
                   { image.preview && <img src={image.preview} className="img-fluid " />}
                  </div>
                  
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12">
                  <div class="form-floating mb-3">
                    <textarea onChange={(e)=>setCaption(e.target.value)} className="form-control" placeholder="Add Caption" />
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      onChange={(e)=>setLocation(e.target.value)}
                      className="form-control"
                      id="floatingInput"
                      placeholder="Add Location"
                    />
                    <label for="floatingInput">
                      <i className="fa-solid fa-location-dot px-2"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">


                  <button
                    type="submit"
                    onClick={addPost}
                    className="custom-btn-pink shadow-sm float-end"
                  >
                    <span className="fs-6">Posts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
