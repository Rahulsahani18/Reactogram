import React, { useState } from 'react'
import './card.css'
import { useSelector } from 'react-redux'
import  {API_URL} from '../config';
import axios from 'axios';

const Cards = (props) => {

  const user = useSelector(state => state.userReducer);

 const [commentBox,setCommentBox]=useState(false);
 const [comment,setComment]=useState('');

 const CONFIG_OBJ={
  headers:{
    "Content-Type":"application/json",
    "authorization":"Bearer " + localStorage.getItem('token')
  }
}

//  const getAllPosts= async()=>{
//   const response= await axios.get(`${API_URL}/api/posts/allposts`);
//  }

 const sendComment=async(postId)=>{
  setCommentBox(false)
  const request={"postId":postId,"commentText":comment};
  const response = await axios.put(`${API_URL}/api/posts/comment`,request, CONFIG_OBJ);
  if(response.status===200){
    props.getAllPosts();
 }}

  return (
    <div  className="card shadow ">
      <div className="card-body px-2">
          <div className='row'>
            <div className='col-md-6 d-flex'>
              <img className='post-profile-pic p-2' alt='profile pic' src='https://media.istockphoto.com/id/1438437093/photo/young-adult-woman-in-studio-shots-making-facial-expressions-and-using-fingers-and-hands.webp?b=1&s=170667a&w=0&k=20&c=s64r95WyPrrg3nEc8X33TqYKIyJiyrj2tu4dRUds_-Y=' />
               <div className='mt-2'>
                 <p className='fs-6 fw-bold'>{props.postData.author.fullName}</p>
                 <p className='sub-title'>{props.postData.location}</p>
               </div>
            </div>
            {props.postData.author._id===user.user.id ?
            <div className='col-md-6 three-dot'>
            <i onClick={()=>props.deletePost(props.postData._id)} style={{cursor:"pointer"}} className="fa-solid fa-trash-can float-end mt-md-3 me-3 fs-6 "></i> 
                </div> : ' ' }
              <div className='row'>
                <div className='col-md-12' style={{marginLeft:"11px"}}>
                    <img style={{borderRadius:"5px"}} className='img-fluid' alt={props.postData.Image} src={props.postData.Image} />
                </div>
              </div>
              <div className='row my-2'>
                <div className='col-md-6 lcs-icon '>
                <i onClick={()=>props.likeDislikePost(props.postData._id,'likes')} className=" fs-5 ps-2 fa-regular fa-heart"></i>
                <i  onClick={()=>props.likeDislikePost(props.postData._id,'unlikes')} className="fs-5 ps-2 fa-solid fa-heart-crack" ></i>
                <i onClick={()=>setCommentBox(true)} className="fs-5 ps-3 fa-regular fa-comment"></i>
                {/* <i className="fs-5 ps-3 fa-regular fa-paper-plane"></i> */}
                </div>
                <div className='col-md-6'>
                   <span className='fw-bold likes fs-6 float-end'>{props.postData.likes.length}Likes</span>
                </div>
              </div>

             {commentBox ? <div className='row '>
                <div className='col-8'>
                   <textarea onChange={(e)=>setComment(e.target.value)} className='form-control'></textarea>
                </div>
                <div className='col-4'>
                   <button onClick={()=>sendComment(props.postData._id)} className='btn btn-warning'>Submit</button>
                </div>
              </div>: ''}
     
                {props.postData.comments.map((comment)=>{
           return (<div className='row '>
            <div className='col-md-12 ms-md-2 '>
                <p>{comment.commentText} - {comment.commentBy.fullName}</p>
            </div>
            </div>)
                })}

             

              <div className='row '>
                <div className='col-md-12 ms-md-2 '>
                    <span className='text-muted post-time'>2 Houres</span>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Cards