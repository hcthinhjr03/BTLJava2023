import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  creatNewArticleReaction,
  creatNewComment,
  deleteArticleReaction,
  deleteComment,
  getArticleById,
  getArticleComments,
  getDislikeStatus,
  getLikeStatus,
  updateArticleDislike,
  updateArticleLike,
} from "../../../services/articlesService";
import "./ArticleDetail.scss";
//import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaThumbsUp, FaThumbsDown, FaTrashAlt, FaRegCommentDots } from "react-icons/fa";
import { getCookie } from "../../../helpers/cookie";
import {
  getUserById,
  updateUserDislike,
  updateUserLike,
} from "../../../services/usersService";
import { getNowDate } from "../../../helpers/getNowDate";

function ArticleDetail() {
  const { id } = useParams();

  const userId = getCookie("id");
  const [detail, setDetail] = useState({});
  const [like, setLike] = useState();
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislike, setDislike] = useState();
  const [dislikeStatus, setDislikeStatus] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getArticleById(id);
      setDetail(result[0]);
      setLike(result[0].likes);
      setDislike(result[0].dislikes);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      const resultOfLike = await getLikeStatus(userId, id);
      if (resultOfLike.length > 0) {
        setLikeStatus(true);
      } else {
        setLikeStatus(false);
      }

      const resultOfDislike = await getDislikeStatus(userId, id);
      if (resultOfDislike.length > 0) {
        setDislikeStatus(true);
      } else {
        setDislikeStatus(false);
      }
    };
    fetchApi();
  }, [userId, id]);

  useEffect(() => {
    const fetchApi = async () => {
      const resultOfComments = await getArticleComments(id);
      setComments(resultOfComments);
    };
    fetchApi();
  }, [id]);

  const [userComment, setUserComment] = useState([]);

  // useEffect(() => {
  //   const getListUserComment = async () => {
  //      let listOfUser = [];
  //     for (let i = 0; i < comments.length; i++) {
  //       const result = await getUserById(comments[i].user_id);
  //        listOfUser.push(result[0]);
  //     }
  //      setUserComment(listOfUser);
  //   };
  //   getListUserComment();
  // }, [comments]);

  useEffect(() => {
    const fetchUserForComments = async () => {
      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const userData = await getUserById(comment.user_id);
          return { ...comment, user: userData[0] };
        })
      );
      setUserComment(commentsWithUsers);
    };

    fetchUserForComments();
  }, [comments]);


  const handleLike = async () => {
    //xu li unlike
    if (likeStatus) {
      setLike(like - 1);
      setLikeStatus((prev) => !prev);

      let newLikeValue = like - 1;
      let option1 = {
        likes: newLikeValue,
      };
      const resultOfArticle = await updateArticleLike(id, option1);
      console.log(resultOfArticle);

      const userInfo = await getUserById(detail.userId);
      let newLikeOfUser = userInfo[0].likes - 1;
      let option2 = {
        likes: newLikeOfUser,
      };
      const resultOfUser = await updateUserLike(detail.userId, option2);
      console.log(resultOfUser);
      //Xoa reaction_article cu
      const thisReaction = await getLikeStatus(userId, id);
      let thisReactionId = thisReaction[0].id;
      const resultOfDeleteReaction = await deleteArticleReaction(
        thisReactionId
      );
      console.log(resultOfDeleteReaction);
    }
    //xu li like
    else {
      setLike(like + 1);
      setLikeStatus((prev) => !prev);

      //bai nay tang like
      let newLikeOfArticle = like + 1;
      let option1 = {
        likes: newLikeOfArticle,
      };
      const resultOfArticle = await updateArticleLike(id, option1);
      console.log(resultOfArticle);
      //user viet bai nay tang like
      const userInfo = await getUserById(detail.userId);
      let newLikeOfUser = userInfo[0].likes + 1;
      console.log(newLikeOfUser);
      let option2 = {
        likes: newLikeOfUser,
      };
      const resultOfUser = await updateUserLike(detail.userId, option2);
      console.log(resultOfUser);
      //Tao reaction_article moi
      let option3 = {
        user_id: parseInt(userId),
        article_id: parseInt(id),
        reaction_type: 1,
      };
      const thisReaction = await creatNewArticleReaction(option3);
      console.log(thisReaction);
    }
  };

  const handleDislike = async () => {
    if (dislikeStatus) {
      setDislike(dislike - 1);
      setDislikeStatus((prev) => !prev);

      let newDislikeValue = dislike - 1;
      let option1 = {
        dislikes: newDislikeValue,
      };
      const resultOfArticle = await updateArticleDislike(id, option1);
      console.log(resultOfArticle);

      const userInfo = await getUserById(detail.userId);
      let newDislikeOfUser = userInfo[0].dislikes - 1;
      let option2 = {
        dislikes: newDislikeOfUser,
      };
      const resultOfUser = await updateUserDislike(detail.userId, option2);
      console.log(resultOfUser);

      const thisReaction = await getDislikeStatus(userId, id);
      let thisReactionId = thisReaction[0].id;
      const resultOfDeleteReaction = await deleteArticleReaction(
        thisReactionId
      );
      console.log(resultOfDeleteReaction);
    } else {
      setDislike(dislike + 1);
      setDislikeStatus((prev) => !prev);

      let newDislikeOfArticle = dislike + 1;
      let option1 = {
        dislikes: newDislikeOfArticle,
      };
      const resultOfArticle = await updateArticleDislike(id, option1);
      console.log(resultOfArticle);

      const userInfo = await getUserById(detail.userId);
      let newDislikeOfUser = userInfo[0].dislikes + 1;
      let option2 = {
        dislikes: newDislikeOfUser,
      };
      const resultOfUser = await updateUserDislike(detail.userId, option2);
      console.log(resultOfUser);

      let option3 = {
        user_id: parseInt(userId),
        article_id: parseInt(id),
        reaction_type: 2,
      };
      const thisReaction = await creatNewArticleReaction(option3);
      console.log(thisReaction);
    }
  };
  const [newComment, setNewComment] = useState({});

  const handleChange = (e) => {
    setNewComment((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentDate = getNowDate();

    let options = {
      ...newComment,
      article_id: parseInt(id),
      user_id: parseInt(userId),
      comment_time: commentDate,
      likes: 0,
      dislikes: 0,
    };

    const fetchApi = async () => {
      const resultOfNewComment = await creatNewComment(options);
      setComments([...comments, resultOfNewComment]);
    };
    fetchApi();
  };

  const handleDeleteComment = async (id) => {
    const resultOfDelete = await deleteComment(id);
    if (resultOfDelete) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    }
  };

  return (
    <>
      <div className="detail">
        <div className="detail__wrap">
          <div className="detail__header">
            <h1 className="detail__title">{detail.name}</h1>
            <div className="detail__desc">{detail.description}</div>
          </div>
          <div className="detail__image">
            <img src={detail.image} alt="alt" />
          </div>
          <div className="detail__content">{detail.content}</div>
          <div className="detail__info">
            <span style={{ marginRight: "10px" }}>
              <FaThumbsUp />{" "}
            </span>{" "}
            <span style={{ marginRight: "20px" }}>{like}</span>
            <span style={{ marginTop: "5px", marginRight: "10px" }}>
              <FaThumbsDown />{" "}
            </span>{" "}
            {dislike}
          </div>
          <div className="detail__reaction">
            <button
              className="detail__button-like"
              onClick={handleLike}
              style={
                likeStatus
                  ? { background: "blue", color: "white" }
                  : {
                      background: "#212529",
                      color: "blue",
                      border: "1px solid blue",
                    }
              }
            >
              <span style={{ marginRight: "5px" }}>
                <FaThumbsUp />
              </span>
              <span>Like</span>
            </button>
            <button
              className="detail__button-dislike"
              onClick={handleDislike}
              style={
                dislikeStatus
                  ? { background: "red", color: "white" }
                  : {
                      background: "#212529",
                      color: "red",
                      border: "1px solid red",
                    }
              }
            >
              <span style={{ marginTop: "5px", marginRight: "5px" }}>
                <FaThumbsDown />
              </span>
              <span>Dislike</span>
            </button>
          </div>
          <div className="detail__comment">
            <div className="detail__comment--qty">
                <span style={{marginRight: "10px"}}>{userComment.length} comments</span> <FaRegCommentDots/>
            </div>
            {userComment.length > 0 && (
              <div className="detail__comment--list">
                {userComment.map((item) => (
                  <div key={item.id} className="detail__comment--box">
                    <div className="detail__comment--info">
                      {/* {userComment.length > 0 && (
                        <> */}
                      <div className="detail__comment--avt">
                        <img src={item.user.image} alt="" />
                      </div>
                      <div className="detail__comment--username">
                        {item.user.fullName}
                      </div>
                      <div className="detail__comment--date">
                        {item.comment_time}
                      </div>
                      {/* </>
                      )} */}
                    </div>
                    <div className="detail__comment--content">
                      <div className="detail__comment--desc">
                        {item.comment_description}
                      </div>
                      <div className="detail__comment--del">
                        {item.user_id === parseInt(userId) ? (
                          <>
                            <button
                              onClick={() => handleDeleteComment(item.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* <div className="detail__comment--react">
                        <div className="detail__comment--like">
                          <button><FiThumbsUp/></button>
                        </div>
                        <div className="detail__comment--dislike">
                        <button><FiThumbsDown/></button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="detail__comment--input">
              <form onSubmit={handleComment}>
                <textarea
                  className="detail__comment--text"
                  placeholder="Add a comments"
                  cols={80}
                  rows={2}
                  name="comment_description"
                  onChange={handleChange}
                ></textarea>
                <button className="button button-main">Đăng</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleDetail;
