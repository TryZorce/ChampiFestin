import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import PromoStrip from "../components/PromoStrip";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import makeRequest from "@/utils/Fetcher";

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);



  useEffect(() => {
    makeRequest({
      method: "get",
      url: "http://localhost:8000/api/products",
      data: "",
    }).then((data) => {
      const availableProducts = data.filter((product: { available: any; }) => product.available);
      setProducts(availableProducts);
    });
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  function handleProductClick(product: any) {
    setSelectedProduct(product);
  }

  function handleCategoryFilter(category: any) {
    if (category.name === "Tous les produits") {
      setSelectedCategory(null);
    } else {
      console.log(category);

      setSelectedCategory(category);
    }
  }

  function productTemplate(product: any) {
    return (
      <div
        className={`${style.product} m-5 bg-bluegray-900 shadow-1 border-round-xl`}
        onClick={() => handleProductClick(product)}
      >
        <div className={`p-2 m-4 bg-bluegray-900 ${style.content}`}>
          <div
            className={`content-image bg-cover bg-no-repeat bg-center relative ${style.contentImage}`}
          >
            <div className={style.imageContainer}>
              <Image
                src={"http://localhost:8000/uploads/images" + product.image}
                alt=""
                fill={true}
                objectPosition="relative"
                className={`${style.image} border-round-xl shadow-1`}
              />
            </div>
          </div>
          <div
            className={`rating mt-1 absolute border-round-sm ml-1 p-2 bg-gray-800	flex align-items-center gap-2 w-8rem ${style.rating}`}
          >
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400"></i>
            <i className="pi pi-star-fill text-yellow-400 "></i>
            <i className="pi pi-star-fill text-gray-600"></i>
            <i className="pi pi-star-fill text-gray-600"></i>
          </div>
        </div>
        <div className={`content-info pt-1 ${style.contentInfo}`}>
          <div
            className={`flex align-items-center justify-content-between py-2 px-3 ${style.infoHeader}`}
          >
            <span className="font-semibold text-gray-400">Night Mushroom</span>
            <i className="pi pi-verified text-green-400"></i>
          </div>
          <div
            className={`flex align-items-center justify-content-between py-2 px-3 gap-2 ${style.infoRow}`}
          >
            <div className="flex align-items-center gap-2">
              <i className="pi pi-star-fill "></i>
              <span className="font-small text-gray-600 white-space-nowrap">
                Dark Type
              </span>
            </div>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-star-fill "></i>
              <span className="font-small text-gray-600 white-space-nowrap">
                Smooth
              </span>
            </div>
          </div>
          <div
            className={`flex align-items-center justify-content-between py-2 px-3 gap-2 ${style.infoRow}`}
          >
            <div className="flex align-items-center justify-content-center gap-1 border-right-1 surface-border pr-2">
              <i className="pi pi-bolt "></i>
              <span className="font-small text-gray-600 white-space-nowrap">
                Power
              </span>
            </div>
            <div className="flex align-items-center gap-1 justify-content-center gap-1 border-right-1 surface-border px-2">
              <i className="pi pi-cloud "></i>
              <span className="font-small text-gray-600 white-space-nowrap">
                Relax
              </span>
            </div>
            <div className="flex align-items-center gap-1 justify-content-center gap-1 pl-2">
              <i className="pi pi-book "></i>
              <span className="font-small text-gray-600 white-space-nowrap">
                Sleepy
              </span>
            </div>
            <div className="bg-purple-400 shadow-2 border-none p-2 border-round-xs">
              <span className="font-bold">{product.price} €</span>
            </div>
          </div>
          <div
            className={`flex align-items-center justify-content-center pt-2 px-3 gap-2 ${style.buttonRow}`}
          >
            <button
              className={`p-3 flex align-items-center justify-content-center w-7 gap-2 bg-purple-600 shadow-1 border-none cursor-pointer hover:bg-purple-400 transition-duration-200 ${style.contactButton}`}
            >
              <span className="font-semibold text-gray-300 white-space-nowrap">
                Add To Cart
              </span>
              <i className="pi pi-send text-gray-300"></i>
            </button>
            <button
              className={`p-3 flex align-items-center justify-content-center w-5 gap-2 bg-gray-900 shadow-1 border-none cursor-pointer hover:bg-gray-800 transition-duration-200 ${style.rateButton}`}
            >
              <span className="font-semibold text-white white-space-nowrap">
                Rate
              </span>
              <i className="pi pi-thumbs-up-fill text-white"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
      product.category.some((cat: { name: any; }) => cat.name === selectedCategory.name)
    )
    : products;

  const categories = [
    { id: 0, name: "Tous les produits" },

    // id 0 = Option spéciale pour voir tous les produits si changer , modifier function handleCategoryFilter

    { id: 1, name: "Enchanterelles" },
    { id: 2, name: "Célestiflores" },
    { id: 3, name: "Sylvalunaires" },
    { id: 4, name: "Ombraethérique" },
    { id: 5, name: "Chronospires" },
  ];

  return (
    <div>
      <Navbar />
      <PromoStrip />
      {selectedProduct && <ProductDetails product={selectedProduct} onAddToCart={undefined} />}
      <div>
        <ul className={style.categoryContainer}>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryFilter(category)}
              className={`${style.categoryItem} ${selectedCategory && selectedCategory.id === category.id
                ? "active"
                : ""
                }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.carousel}>
        <Carousel
          value={filteredProducts}
          numVisible={3}
          numScroll={3}
          itemTemplate={productTemplate}
          className={style.carouselContainer}
          responsiveOptions={responsiveOptions}
          prevIcon={<i className="pi pi-chevron-left"></i>}
          nextIcon={<i className="pi pi-chevron-right"></i>}
        />
      </div>
    </div>
  );
}

export default Home;
