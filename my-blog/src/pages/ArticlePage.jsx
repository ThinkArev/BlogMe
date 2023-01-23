import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const params = useParams();
  const articleId = params.articleId;
  useEffect(() => {
    console.log("this is useEffect");
    const loadArticles = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      console.log("this is article Info ,", newArticleInfo);
      setArticleInfo(newArticleInfo);
    };

    loadArticles();
  }, []);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updateArticle = response.data;
    setArticleInfo(updateArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvote-sectio">
        <button onClick={addUpvote}>upvote</button>
        <p>This article has {articleInfo.upvotes} upvotes(s)</p>
      </div>
      {article.content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      {console.log("commensts : ", articleInfo.comments[0])};
      <CommentList comments={articleInfo.comments} />
      <AddCommentForm articleName={articleId}  onArticleUpdated={(updatedInfo)=>{setArticleInfo(updatedInfo)}}/>
    </> 
  );
};

export default ArticlePage;
