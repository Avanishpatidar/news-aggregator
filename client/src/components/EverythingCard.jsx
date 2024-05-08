import React from "react";
import test from "./../assets/test.webp";

function Card(props) {
  return (
    <div className='everything-card flex flex-col p-5 gap-3 mb-5'>
        <p className="title font-medium mb-2">{props.title}</p>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.imgUrl} alt="img" />
        </div>
        <div className="description">
          <p className="description-text leading-7">{props?.description?.substring(0,200)}</p>
        </div>
        <div className="info">
          <p className="url mb-2"><span className='font-semibold'>url : </span><a href={props.url} target="_blank" className="link underline break-words">{props.url.substring(0,70)}</a></p>
          <div className="origin flex justify-between flex-wrap">
            <p><span className='font-semibold'>Source :</span>{props.source}</p>
            <p><span className="font-semibold">Author :</span>{props.author}</p>
          </div>
          <p className="date opacity-60">({props.publishedAt})</p>
        </div>
    </div>

   
  );
}

export default Card;
