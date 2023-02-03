import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { removeComment } from "../redux/features/comment/commentOperations";

const CommentItem = ({ cmt }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const cutUsername = username.split("").slice(0, 2).join("");

  const deleteComments = () => {
    dispatch(removeComment(cmt._id));
  };

  if (!cmt) {
    return;
  }

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
          {cutUsername}
        </div>

        <div className="text-xs text-white opacity-60 pt-4">{cmt.comment}</div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <button className="flex justify-center items-center gap-2 text-white opacity-50">
          <AiTwotoneEdit />
        </button>
        <button
          onClick={deleteComments}
          className="flex justify-center items-center gap-2 text-white opacity-50"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
