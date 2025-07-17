import {useState} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const Comments = () => {
  const [nameInput, setNameInput] = useState('')
  const [commentInput, setCommentInput] = useState('')
  const [commentsList, setCommentsList] = useState([])

  const renderCommentsList = () => {
    return commentsList.map(comment => (
      <CommentItem
        key={comment.id}
        commentDetails={comment}
        toggleLike={toggleLike}
        deleteComment={deleteComment}
      />
    ))
  }

  const onAddComment = event => {
    event.preventDefault()
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    if (nameInput !== '' && commentInput !== '') {
      const newComment = {
        id: v4(),
        name: nameInput,
        comment: commentInput,
        date: new Date(),
        isLiked: false,
        initialClassName: initialBackgroundColorClassName,
      }

      setCommentsList([...commentsList, newComment])
      setNameInput('')
      setCommentInput('')
    }
  }

  const onChangeCommentInput = event => {
    setCommentInput(event.target.value)
  }

  const onChangeNameInput = event => {
    setNameInput(event.target.value)
  }

  const deleteComment = id => {
    const filteredComments = commentsList.filter(
      eachComment => id !== eachComment.id,
    )
    setCommentsList(filteredComments)
  }
  const toggleLike = id => {
    setCommentsList(prevList => {
      return prevList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      })
    })
  }

  return (
    <div className="app-container">
      <div className="comments-container">
        <h1 className="app-heading">Comments</h1>
        <div className="comments-inputs">
          <form className="form" onSubmit={onAddComment}>
            <p className="form-description">
              Say something about 4.0 Technologies
            </p>
            <input
              value={nameInput}
              type="text"
              className="name-input"
              placeholder="Your Name"
              onChange={onChangeNameInput}
            />
            <textarea
              value={commentInput}
              placeholder="Your Comment"
              className="comment-input"
              onChange={onChangeCommentInput}
              rows="6"
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </form>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="line" />
        <p className="heading">
          <span className="comments-count">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{renderCommentsList()}</ul>
      </div>
    </div>
  )
}

export default Comments
