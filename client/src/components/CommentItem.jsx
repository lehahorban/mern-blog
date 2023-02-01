import React from "react";
import { useSelector } from "react-redux";

const CommentItem = ({ cmt }) => {
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const cutUsername = username.split("").slice(0, 2).join("");
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {cutUsername}
      </div>
      <div className="flex text-gray-300 text-[10px]">{cmt.comment}</div>
    </div>
  );
};

export default CommentItem;
