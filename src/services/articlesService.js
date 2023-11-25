import { del, get, patch, post } from "../utils/request";

export const getArticle = async () => {
    const result = await get(`articles`);
    return result;
}

export const getOutstandingArticle = async () => {
    const result = await get(`article?featured=true`);
    return result;
}

export const getApprovedArticle = async () => {
    const result = await get(`articles?status=1`);
    return result;
}

export const getNonApprovedArticle = async () => {
    const result = await get(`articles?status=0`);
    return result;
}

export const getArticleById = async (id) => {
    const result = await get(`articles?id=${id}`);
    return result;
}

export const getArticleByCategory = async (category) => {
    const result = await get(`articles?category=${category}`);
    return result;
}

export const getApprovedArticleByCategory = async (category) => {
    const result = await get(`articles?category=${category}&status=1`);
    return result;
}

export const creatArticle = async (options) => {
    const result = await post(`articles`, options);
    return result;
}

export const getLikeStatus = async (userId, articleId) => {
    const result = await get(`reaction_articles?user_id=${userId}&article_id=${articleId}&reaction_type=1`);
    return result;
}

export const getDislikeStatus = async (userId, articleId) => {
    const result = await get(`reaction_articles?user_id=${userId}&article_id=${articleId}&reaction_type=2`);
    return result;
}

export const getArticleReactions = async (articleId) => {
    const result = await get(`reaction_articles?article_id=${articleId}`);
    return result;
}

export const creatNewArticleReaction = async (options) => {
    const result = await post(`reaction_articles`, options);
    return result;
}

export const deleteArticleReaction = async (id) => {
    const result = await del(`reaction_articles/${id}`);
    return result;
}

export const getArticleComments = async (id) => {
    const result = await get(`comments?article_id=${id}`);
    return result;
}

export const creatNewComment = async (options) => {
    const result = await post(`comments`, options);
    return result;
}

export const deleteComment = async (id) => {
    const result = await del(`comments/${id}`);
    return result;
}

export const deleteArticle = async (id) => {
    const result = await del(`articles/${id}`);
    return result;
}

export const updateArticle = async (id, options) => {
    const result = await patch(`articles/${id}`, options);
    return result;
}