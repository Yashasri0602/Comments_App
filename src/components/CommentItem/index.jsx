import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, initialClassName, date, isLiked} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''

  const postedTime = formatDistanceToNow(date)

  const imageLike = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  function onClickLike() {
    toggleLike(id)
  }
  function onClickDelete() {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <button type="button" className="likebtn" onClick={onClickLike}>
            <div className="insideLike">
              <img className="likeImg" src={imageLike} alt="like" />
              <p>Like</p>
            </div>
          </button>
        </div>
        <button
          className="button"
          type="button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
