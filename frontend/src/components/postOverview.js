import React, {useEffect,useState} from "react";
import axios from 'axios';
import Cards from "../components/cards";
import  {API_URL} from '../config';
import swal from 'sweetalert2';

const PostOverview = () => {

    const [allPosts, setAllPosts]=useState([]);

    const CONFIG_OBJ={
        headers:{
          "Content-Type":"application/json",
          "authorization":"Bearer " + localStorage.getItem('token')
        }
      }

    const getAllPosts= async()=>{
    const response= await axios.get(`${API_URL}/api/posts/allposts`);
    
    
    if(response.status===200){
        setAllPosts(response.data.posts)
    }
    else{
        swal.fire({
            icon: 'error',
            title: 'Some error occurred!',
          });
    }
}
    



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
                        getAllPosts();
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

    const likeDislikePost=async(postId, type)=>{
        
        const request={"postId":postId};
        const response = await axios.put(`${API_URL}/api/posts/${type}`,request, CONFIG_OBJ);
        if(response.status===200){
        getAllPosts();
        
    }
}
    
    useEffect(()=>{
        getAllPosts()
    },[])

    return (
        <>
        <div className="container mt-5 "><div className="row">
                    {allPosts.map((post)=>{
                        return( <div className="col-md-4 mb-3" key={post._id}>
                                  <Cards postData={post} deletePost={deletePost}  likeDislikePost={likeDislikePost} getAllPosts={getAllPosts}/>
                               </div>)
                    })}
                </div>
            </div>
        </>
    );
};

export default PostOverview;
