import React, { useEffect, useState } from "react";

const Notice = (props) => {
  const [noticeState, setNoticeState] = useState(false);
  useEffect(() => {
    if (props.message !== null && props.message !== "") setNoticeState(true);
  }, [props.message]);
  return (
    <div
      className={`w-auto h-auto p-5 bg-pink-400 rounded-lg font-semibold text-md flex justify-center items-center text-white ${
        noticeState ? "" : "hidden"
      }`}
    >
      {props.message}
    </div>
  );
};

export default Notice;
