import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const ActivityComments = (props) => {
  const handleEditButton = (comment) => {
    const editButton = document.getElementById(
      `editButton${comment.commentId}`
    );
    const commentDisplay = document.getElementById(
      `displayForComment${comment.commentId}`
    );
    // si el contenido del botton es save (y es diferente al contenido actual en el las props?)
    if (editButton.innerText === "Save") {
      // cambiar el contenido del botton a edit
      editButton.innerText = "Edit";
      commentDisplay.addEventListener("click", (ev) => {
        const field = ev.target;
        field.contentEditable = false;
      });
      if (commentDisplay.innerText !== comment.text) {
        // guardar datos en una variable
        const data = {
          text: commentDisplay.innerText,
          commentId: comment.commentId,
        };
        // enviar el contenido del input a la base de datos
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/activities/updateCommentFrom/${props.activityId}`,
            data
          )
          .then((res) => {
            // actualizar los comentarios en el estado del componente
            setComments(res.data);
          })
          .catch((err) => console.log(err));
      }
    } else if (editButton.innerText === "Edit") {
      // si el contenido del botton es Edit:
      // cambiar el contenido del botton a save
      editButton.innerText = "Save";
      // mostrar el input con el contenido del comentario
      commentDisplay.addEventListener("click", (ev) => {
        const field = ev.target;
        field.contentEditable = true;
      });
    }
  };
  const [comments, setComments] = useState(props.comments);
  const [newCommentText, setNewCommentText] = useState("");
  const handleChange = (e) => {
    setNewCommentText(e.target.value);
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    const newCommentData = {
      userName: props.auth.user.userName,
      userId: props.auth.user.id,
      text: newCommentText,
      commentId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/activities/addCommentTo/${props.activityId}`,
        newCommentData
      )
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
    // makes the input field empty
    document.getElementById(`${props.activityId}`).value = "";
  };
  const handleDelete = (text, userId, commentId) => {
    const data = {
      text,
      userId,
      commentId,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/activities/deleteCommentFrom/${props.activityId}`,
        data
      )
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };
  const toDisplay = comments.map((comment, index) => {
    return (
      <li key={index}>
        <h6>{comment.userName}:</h6>
        <p id={`displayForComment${comment.commentId}`}> {comment.text}</p>
        {comment.userId === props.auth.user.id ? (
          <div>
            <button
              onClick={() => handleEditButton(comment)}
              id={`editButton${comment.commentId}`}
            >
              Edit
            </button>
            <button
              onClick={() =>
                handleDelete(comment.text, comment.userId, comment.commentId)
              }
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </li>
    );
  });
  const addIfLogged = props.auth.isAuthenticated ? (
    <li>
      <form onSubmit={handleAddComment}>
        <input
          onChange={handleChange}
          type="text"
          name="newComment"
          id={`${props.activityId}`}
          placeholder="Let your comment here"
        />
        <button type="submit">Add Comment</button>
      </form>
    </li>
  ) : (
    <li>
      <button className="btn btn-primary btn-block" type="button">
        <Link to="/login">Login to write a comment</Link>
      </button>
    </li>
  );
  return (
    <ul>
      <p>{props.activityId}</p>
      {toDisplay}
      {addIfLogged}
    </ul>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, {})(ActivityComments);
