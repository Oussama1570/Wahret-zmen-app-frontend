import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getImgUrl } from "../../utils/getImgUrl";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [quantity, setQuantity] = useState(1);

  if (!product) return null; // ✅ Prevent crash if product is undefined

  const title =
    product?.translations?.[lang]?.title ||
    product?.title ||
    "";

  const description =
    product?.translations?.[lang]?.description ||
    product?.description ||
    "";

  const displayedColor =
    product?.colors?.[0]?.colorName?.[lang] ||
    product?.colors?.[0]?.colorName?.en ||
    t("default");

  const displayedStock =
    product?.colors?.[0]?.stock ??
    product?.stockQuantity ??
    0;

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value > displayedStock ? displayedStock : value);
  };

  const handleAddToCart = () => {
    const defaultColor = product?.colors?.[0] || {
      colorName: {
        en: "Original",
        fr: "Original",
        ar: "أصلي",
      },
      image: product?.coverImage,
      stock: product?.stockQuantity,
    };

    if ((defaultColor?.stock ?? 0) > 0 && quantity > 0) {
      dispatch(
        addToCart({
          ...product,
          quantity,
          color: defaultColor,
        })
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 transition-transform duration-300 hover:scale-105 flex flex-col justify-between text-center w-full max-w-xs mx-auto">
      <div className="relative w-full h-52 border rounded-md overflow-hidden group">
        <Link to={`/products/${product._id}`}>
          <img
            src={getImgUrl(product?.coverImage)}
            alt={title}
            className="w-full h-full object-cover p-2 cursor-pointer transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {/* 📍 Badges for mobile and desktop */}
        <>
          {/* 📱 Mobile: stock + tendances stacked top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-2 md:hidden">
            {/* Stock badge */}
            <div
              className={`px-2 py-1 text-xs font-bold rounded-full ${
                displayedStock > 0 ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {displayedStock > 0 ? `${t("stock")}: ${displayedStock}` : t("out_of_stock")}
            </div>

            {/* Tendance badge */}
            {product.trending && (
              <div className="px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                {t("trending")}
              </div>
            )}
          </div>

          {/* 💻 Desktop: stock left, tendances right */}
          <div className="hidden md:flex justify-between items-start p-2 absolute top-0 left-0 right-0">
            {/* Stock badge */}
            <div
              className={`px-2 py-1 text-xs font-bold rounded-full ${
                displayedStock > 0 ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {displayedStock > 0 ? `${t("stock")}: ${displayedStock}` : t("out_of_stock")}
            </div>

            {/* Tendance badge */}
            {product.trending && (
              <div className="px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                {t("trending")}
              </div>
            )}
          </div>
        </>
      </div>

      <div className="mt-3 px-2 flex flex-col gap-2">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600">{title}</h3>
        </Link>

        <p className="text-gray-600 text-sm">
          {description.length > 60 ? `${description.slice(0, 60)}...` : description}
        </p>

        {displayedColor && (
          <p className="text-sm text-gray-500 italic">
            {t("color")}: <span className="text-gray-700 font-medium">{displayedColor}</span>
          </p>
        )}

        {product.colors?.length > 0 && (
          <div className="text-sm text-gray-600">
            <p className="font-medium">{t("available_colors")}:</p>
            <ul className="flex flex-wrap justify-center gap-2 mt-1">
              {product.colors.map((colorObj, idx) => (
                <li
                  key={colorObj.colorName?.[lang] || colorObj.colorName?.en || idx}
                  className="px-2 py-1 border rounded text-xs bg-gray-100"
                >
                  {colorObj.colorName?.[lang] || colorObj.colorName?.en || "-"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="font-medium text-lg">
          <span className="text-green-600 font-bold">${product?.newPrice}</span>
          {product?.oldPrice && (
            <span className="text-gray-500 line-through ml-2 text-sm">
              ${Math.round(product?.oldPrice)}
            </span>
          )}
        </p>

        <div className="flex items-center justify-center text-sm">
          <label className="mr-2">{t("quantity")}:</label>
          <input
            type="number"
            min="1"
            max={displayedStock}
            value={quantity}
            onChange={handleQuantityChange}
            className="border rounded px-2 w-14 text-center"
            disabled={displayedStock === 0}
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={displayedStock === 0}
          className={`mt-3 px-6 py-2 rounded-md text-white text-sm font-medium ${
            displayedStock > 0
              ? "bg-[#8B5C3E] hover:bg-[#74452D]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <FiShoppingCart className="inline mr-2" />
          {displayedStock > 0 ? t("add_to_cart") : t("out_of_stock")}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


