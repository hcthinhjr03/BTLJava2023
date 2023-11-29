import { del, get, patch, post } from "../utils/request";

export const getArticle = async () => {
    const result = await get(`article`);
    return result;
}
export const getOutstandingArticle = async () => {
    const result = await get(`article?featured=true`);
    return result;
}
export const getArticleById = async (id) => {
    const result = await get(`article?id=${id}`);
    return result;
}
export const getApprovedArticle = async () => {
    const result = await get(`article?accepted=true`);
    return result;
}
export const creatArticle = async (options) => {
    const result = await post(`article`, options);
    return result;
}
export const deleteArticle = async (userId, articleId) => {
    const result = await del(`article?userId=${userId}&articleId=${articleId}`);
    return result;
}

export const getNewestArticle = async () => {
    const result = await get(`article?sortBy=newest`);
    return result;
}

export const getArticleByCategory = async (category) => {
    const result = await get(`article?category=${category}`);
    return result;
}

export const getNonApprovedArticle = async (userId) => {
    const result = await get(`article?uncensored=true&userId=${userId}`);
    return result;
}



export const getApprovedArticleByCategory = async (category) => {
    const result = await get(`articles?category=${category}&status=1`);
    return result;
}


export const getReactionStatus = async (userId, articleId) => {
    const result = await get(`reaction_article?articleId=${articleId}&userId=${userId}`);
    return result;
}

// export const getDislikeStatus = async (userId, articleId) => {
//     const result = await get(`reaction_articles?user_id=${userId}&article_id=${articleId}&reaction_type=2`);
//     return result;
// }

export const getArticleReactions = async (articleId) => {
    const result = await get(`reaction_articles?article_id=${articleId}`);
    return result;
}

export const createNewArticleReaction = async (options) => {
    const result = await post(`reaction_article`, options);
    return result;
}

export const deleteArticleReaction = async (id) => {
    const result = await del(`reaction_article?reactionArticleId=${id}`);
    return result;
}

export const getArticleComments = async (id) => {
    const result = await get(`comment?articleId=${id}&sortBy=newest`);
    return result;
}

export const creatNewComment = async (options) => {
    const result = await post(`comment`, options);
    return result;
}

export const deleteComment = async (userId, commentId) => {
    const result = await del(`comment?userId=${userId}&commentId=${commentId}`);
    return result;
}

export const deleteAllCommentsOfArticle = async (articleId) => {
    const result = await del(`comment?byArticle=true&articleId=${articleId}`);
    return result;
}


export const deleteAllReactionsOfArticle = async (articleId) => {
    const result = await del(`reaction_article?articleId=${articleId}`);
    return result;
}


export const updateArticle = async (options) => {
    const result = await patch(`article`, options);
    return result;
}

