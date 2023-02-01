import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  if (!post) {
    return <div>Завантаження...</div>;
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:3002/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">{post.username}</div>
          <div className="text-xs text-white opacity-50">
            {<Moment data={post.createdAt} format={"D MMM YYYY"} />}
          </div>
        </div>
        <div className="text-xl text-white">{post.title}</div>
        <p className="text-xs text-white opacity-60 pt-4 line-clamp-4">
          {post.text}
        </p>
        <div className="flex gap-3 items-center mt-2">
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views || 0}</span>
          </button>
          <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comment?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;