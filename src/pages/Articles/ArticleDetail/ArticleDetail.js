import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  creatNewComment,
  createNewArticleReaction,
  deleteArticleReaction,
  deleteComment,
  getArticleById,
  getArticleComments,
  getReactionStatus,
  updateArticle,
} from "../../../services/articlesService";
import "./ArticleDetail.scss";
import { FaThumbsUp, FaThumbsDown, FaTrashAlt, FaRegCommentDots } from "react-icons/fa";
import { getCookie } from "../../../helpers/cookie";
import {
  getUserById, updateDislikeOfUserWriteArticle, updateLikeOfUserWriteArticle, updateThisUserLike
} from "../../../services/usersService";

function ArticleDetail() {
  const { id } = useParams();

  const userId = getCookie("user_id");
  const [detail, setDetail] = useState({});
  const [like, setLike] = useState();
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislike, setDislike] = useState();
  const [dislikeStatus, setDislikeStatus] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getArticleById(id);
      setDetail(result);
      setLike(result.likes);
      setDislike(result.dislikes);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      const resultOfReaction = await getReactionStatus(userId, id);
      if(resultOfReaction){
        if (resultOfReaction.reationType === true) {
          setLikeStatus(true);
          setDislikeStatus(false);
        } else {
          setDislikeStatus(true);
          setLikeStatus(false);
        }
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
          const userData = await getUserById(comment.userId);
          return { ...comment, user: userData };
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
        articleId: id,
        likes: newLikeValue,
        dislikes: dislike
      };
      const resultOfArticle = await updateArticle(option1);
      console.log(resultOfArticle);

      // const userInfo = await getUserById(detail.userId);
      // let newLikeOfUser = userInfo[0].likes - 1;
      // let newScoreOfUser = userInfo[0].score_to_award - 10;
      let option2 = {
        numberlikes: -1,
        user_id: detail.userId
      };
      const resultOfUser = await updateLikeOfUserWriteArticle(option2);
      console.log(resultOfUser);
      //Xoa reaction_article cu
      const thisReaction = await getReactionStatus(userId, id);
      let thisReactionId = thisReaction.reactionArticleId;
      const resultOfDeleteReaction = await deleteArticleReaction(
        thisReactionId
      );
      console.log(resultOfDeleteReaction);

      
      let option4 = {
        user_id: userId,
        numberlikes: -1
      }
      const resultOfScore = await updateThisUserLike(option4);
      console.log(resultOfScore);
    }
    //xu li like
    else {
      setLike(like + 1);
      setLikeStatus((prev) => !prev);

      //bai nay tang like
      let newLikeOfArticle = like + 1;
      let option1 = {
        articleId: id,
        likes: newLikeOfArticle,
        dislikes: dislike
      };
      const resultOfArticle = await updateArticle(option1);
      console.log(resultOfArticle);
      //user viet bai nay tang like + score

      let option2 = {
        numberlikes: 1,
        user_id: detail.userId
      };
      console.log(option2);
      const resultOfUser = await updateLikeOfUserWriteArticle(option2);
      console.log(resultOfUser);
      
      //Tao reaction_article moi
      let option3 = {
        userId: userId,
        articleId: id,
        reactionType: true,
      };
      const thisReaction = await createNewArticleReaction(option3);
      console.log(thisReaction);
      //Nguoi like bai tang score

      let option4 = {
        user_id: userId,
        numberlikes: 1
      }
      const resultOfScore = await updateThisUserLike(option4);
      console.log(resultOfScore);
    }
  };

  const handleDislike = async () => {
    if (dislikeStatus) {
      setDislike(dislike - 1);
      setDislikeStatus((prev) => !prev);

      let newDislikeValue = dislike - 1;
      let option1 = {
        articleId: id,
        likes: like,
        dislikes: newDislikeValue,
      };
      const resultOfArticle = await updateArticle(option1);
      console.log(resultOfArticle);

      let option2 = {
        user_id: detail.userId,
        numberdislikes: -1,
      };
      const resultOfUser = await updateDislikeOfUserWriteArticle(option2);
      console.log(resultOfUser);

      const thisReaction = await getReactionStatus(userId, id);
      let thisReactionId = thisReaction.reactionArticleId;
      const resultOfDeleteReaction = await deleteArticleReaction(
        thisReactionId
      );
      console.log(resultOfDeleteReaction);
      // const thisUserInfo = await getUserById(userId);
      // let newScoreOfThisUser = thisUserInfo[0].score_to_award - 1;
      // let option4 = {
      //   score_to_award: newScoreOfThisUser
      // }
      // const resultOfScore = await updateUser(userId, option4);
      // console.log(resultOfScore);
    } else {
      setDislike(dislike + 1);
      setDislikeStatus((prev) => !prev);

      let newDislikeOfArticle = dislike + 1;
      let option1 = {
        articleId: id,
        likes: like,
        dislikes: newDislikeOfArticle
      };
      const resultOfArticle = await updateArticle(option1);
      console.log(resultOfArticle);

      // const userInfo = await getUserById(detail.userId);
      // let newDislikeOfUser = userInfo[0].dislikes + 1;
      let option2 = {
        user_id: detail.userId,
        numberdislikes: 1,
      };
      const resultOfUser = await updateDislikeOfUserWriteArticle(option2);
      console.log(resultOfUser);

      let option3 = {
        userId: userId,
        articleId: id,
        reactionType: false,
      };
      const thisReaction = await createNewArticleReaction(option3);
      console.log(thisReaction);
      // const thisUserInfo = await getUserById(userId);
      // let newScoreOfThisUser = thisUserInfo[0].score_to_award + 1;
      // let option4 = {
      //   score_to_award: newScoreOfThisUser
      // }
      // const resultOfScore = await updateUser(userId, option4);
      // console.log(resultOfScore);

    }
  };
  const [newComment, setNewComment] = useState({});

  const handleChange = (e) => {
    setNewComment((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleComment = (e) => {
    e.preventDefault();


    let options = {
      ...newComment,
      articleId: id,
      userId: userId
    };

    const fetchApi = async () => {
      const resultOfNewComment = await creatNewComment(options);
      setComments([...comments, resultOfNewComment]);
    };
    fetchApi();

    let optionScore = {
      user_id: userId,
      numberlikes: 2
    }

    const updateScore = async () => {
      const resultOfScore = await updateThisUserLike(optionScore);
      console.log(resultOfScore);
    }

    updateScore();
    // const resultOfScore = await updateThisUserLike(option4);
    // console.log(resultOfScore);
    
    // const updateScoreOfThisUser = async () => {
    //   const thisUserInfo = await getUserById(userId);
    //   let newScoreOfThisUser = thisUserInfo[0].score_to_award + 2;
    //   let option4 = {
    //     score_to_award: newScoreOfThisUser
    //   }
    //   const resultOfScore = await updateUser(userId, option4);
    //   console.log(resultOfScore);
    // }
    // updateScoreOfThisUser();
  };

  const handleDeleteComment = async (id) => {
    
    const resultOfDelete = await deleteComment(userId, id);
    if (resultOfDelete) {
      const updatedComments = comments.filter((comment) => comment.commentId !== id);
      setComments(updatedComments);
    }

    // const thisUserInfo = await getUserById(userId);
    //   let newScoreOfThisUser = thisUserInfo[0].score_to_award - 2;
      let optionScore = {
        user_id: userId,
        numberlikes: -2
      }
      const resultOfScore = await updateThisUserLike(optionScore);
      console.log(resultOfScore);
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
                  <div key={item.commentId} className="detail__comment--box">
                    <div className="detail__comment--info">
                      {/* {userComment.length > 0 && (
                        <> */}
                      <div className="detail__comment--avt">
                        <img src={item.user.avatar_image_path} alt="" />
                      </div>
                      <div className="detail__comment--username">
                        {item.user.full_name}
                      </div>
                      <div className="detail__comment--date">
                        {item.commentTime}
                      </div>
                      {/* </>
                      )} */}
                    </div>
                    <div className="detail__comment--content">
                      <div className="detail__comment--desc">
                        {item.commentContent}
                      </div>
                      <div className="detail__comment--del">
                        {item.userId === parseInt(userId) ? (
                          <>
                            <button
                              onClick={() => handleDeleteComment(item.commentId)}
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
                  name="commentContent"
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
