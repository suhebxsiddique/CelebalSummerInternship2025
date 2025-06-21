import React from "react";

function ImageUtil(props) {
  return (
    <>
      <div class="text-center mb-2 p-4">
        <img src={props.src} class="rounded" alt="Image" />
      </div>
    </>
  );
}

export default ImageUtil;
