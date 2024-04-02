import React, { useState, useEffect } from "react";

const ArrowUp = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="arrowUp">
      {showButton && (
        <button className="d-flex justify-content-center align-items-center fa-solid arrow-up fa-arrow-up" onClick={scrollToTop}></button>
      )}
    </div>
  );
};

export default ArrowUp;

