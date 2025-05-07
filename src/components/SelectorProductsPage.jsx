import React, { useState, useEffect } from "react";
import FadeInSection from "../Animations/FadeInSection.jsx";
import { useTranslation } from "react-i18next";

const SelectorsPageProducts = ({ options = [], onSelect, label }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-SA";
  const [selected, setSelected] = useState(["All"]);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  const handleChange = (value) => {
    let updated = [];

    if (value === "All") {
      updated = ["All"];
    } else {
      if (selected.includes(value)) {
        updated = selected.filter((item) => item !== value);
      } else {
        updated = [...selected.filter((item) => item !== "All"), value];
      }

      if (updated.length === 0) {
        updated = ["All"];
      }
    }

    setSelected(updated);
  };

  return (
    <FadeInSection delay={0.1}>
      <div
        className="flex flex-col items-center mb-10 px-6 sm:px-0"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <label className="text-2xl sm:text-3xl font-semibold text-[#3d2c1e] mb-6 tracking-wider underline decoration-[#D4AF37]">
          {t(label)}
        </label>

        <div className="flex flex-wrap gap-4 justify-center">
          {options.map((option, index) => (
            <label
              key={index}
              className={`transition-transform transform hover:scale-105 duration-300
                flex items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full border-2 text-sm sm:text-base font-medium shadow-sm
                ${
                  selected.includes(option)
                    ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                    : "bg-white border-[#bbb] text-[#444] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={selected.includes(option)}
                onChange={() => handleChange(option)}
                className="hidden"
              />
              <span className="capitalize whitespace-nowrap">
                {t(`product_filters.${option.toLowerCase()}`)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default SelectorsPageProducts;
