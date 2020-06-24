import React from "react";
import ActivityComments from "../ActivityComments";

const Activity = (props) => {
  return (
    <div>
      <h6>{props.activity.title}</h6>
      <small>{props.index}</small>
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}/${props.activity._id}.jpg`}
        alt={`${props.activity.title}`}
      />
      <button
        className="btn btn-primary btn-block"
        type="button"
        data-toggle="collapse"
        data-target={`#collapse${props.activity._id}`}
        aria-expanded="false"
        aria-controls={`collapse${props.activity._id}`}
      >
        Show comments
      </button>
      <div className="collapse" id={`collapse${props.activity._id}`}>
        <ActivityComments
          activityId={props.activity._id}
          comments={props.activity.comments}
        />
      </div>
    </div>
  );
};

export default Activity;
