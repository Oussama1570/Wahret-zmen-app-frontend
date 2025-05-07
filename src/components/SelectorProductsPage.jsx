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
        className="flex flex-col items-center mb-6 px-4 sm:px-0"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <label className="text-xl sm:text-2xl font-serif text-[#5a382d] mb-4 tracking-wide">
          {t(label)}
        </label>

        <div className="flex flex-wrap gap-3 justify-center">
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border 
              cursor-pointer transition-all duration-300
              ${
                selected.includes(option)
                  ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={selected.includes(option)}
                onChange={() => handleChange(option)}
                className="hidden"
              />
              <span className="text-sm sm:text-base font-medium capitalize whitespace-nowrap">
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
