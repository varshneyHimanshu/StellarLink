import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const Posts = ({location,isfollowing}) => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [isfollowing]);
  if(!posts){console.log("no post"); return <div>No Posts</div>};
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading
        ? <Loader/>
        : posts.map((post, id) => {
            return <Post data={post} key={id} location={location}/>;
          })}
    </div>
  );
};

export default Posts;
