import { useEffect, useState } from "react";
import { getOutstandingArticle } from "../../services/articlesService";
import Slider from "react-slick";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../services/productsService";
//import { Link } from 'react-router-dom';

function Home() {
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const settingsArticle = {
    className: "sliderArticle",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const settingsProduct = {
    className: "sliderProduct",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
  };

  useEffect(() => {
    const fetchOutstandingArticle = async () => {
      const result = await getOutstandingArticle();
      setArticles(result);
    };
    fetchOutstandingArticle();
  }, []);

  useEffect(() => {
    const fetchOutstandingProducts = async () => {
      const result = await getProductList();
      setProducts(result);
    };
    fetchOutstandingProducts();
  }, []);

  const currentArticles = articles.slice(0, 10);
  const currentProducts = products.slice(0, 20);

  const handleNavArticle = () => {
    navigate("/article");
  };

  const handleNavProduct = () => {
    navigate("/product");
  };

  return (
    <>
      <div className="articles">
        <div className="title">
          <h1 style={{ color: "#fff" }}>- Popular articles -</h1>
        </div>
        <Slider {...settingsArticle}>
          {currentArticles.map((item) => (
            <div key={item.articleId}>
              {/* <Link to={`/article/${item.id}`}> */}
              <img src={item.image} alt="" />
              <h2>{item.articleName}</h2>
              <div
                style={{
                  fontSize: "18px",
                  color: "white",
                  fontStyle: "italic",
                  marginBottom: "10px",
                }}
              >
                {item.articleDescription}
              </div>
              {/* </Link> */}
            </div>
          ))}
        </Slider>
        <div style={{ textAlign: "center" }}>
          <button
            className="button button-extra"
            style={{ width: "180px" }}
            onClick={handleNavArticle}
          >
            Xem thêm
          </button>
        </div>
      </div>

      <div className="products">
        <div className="title">
        <h1 style={{ color: "#fff" }}>- Best Seller -</h1>
        </div>
        <Slider {...settingsProduct}>
          {currentProducts.map((item) => (
            <div key={item.product_id}>
              <div className="products__box">
                <div className="products__image">
                  <img src={item.imagePath} alt={item.product_name} />
                </div>
                <div className="products__content">
                  <h3 className="products__title">{item.product_name}</h3>
                  <div className="products__price-old">{item.price}đ</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="button button-extra"
            style={{ width: "180px" }}
            onClick={handleNavProduct}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
