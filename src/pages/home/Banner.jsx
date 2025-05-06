import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ScrollFade from '../../Animations/ScrollFade.jsx'; // ✅ Make sure this is the directional one
import AnimatedText from "../../Animations/AnimatedText.jsx";
import '../../Styles/StylesBanner.css';
import bannerImg from "../../assets/Banner/Banner.png";
import "../../Styles/StylesAnimatedText.css";

const Banner = () => {
  const { t } = useTranslation();

  
  return (
    <div className="banner-container-enhanced">
  
      {/* 🖼 Image - Fade from Right */}
      <div className="banner-image-wrapper">
      <ScrollFade direction="right" delay={0.5}>
  <Link to="/products">
    <img
      src={bannerImg}
      alt={t("banner_img_alt")}
      className="banner-img"
    />
  </Link>
</ScrollFade>

      </div>
  
      {/* ✨ Text Section */}
      <div className="banner-text-wrapper">
  
        {/* Title - No animation */}
        <h1 className="banner-title">{t("banner_title")}</h1>
  
        {/* Description - Animated Text */}
        <div className="banner-description">
          <AnimatedText text={t("banner_description")} />
        </div>
  
        {/* CTA Button - No animation */}
        <Link to="/products">
          <button className="banner-cta-btn">
            {t("discover_now", "Discover Now")}
          </button>
        </Link>
  
      </div>
    </div>
  );
  
  };

export default Banner;
