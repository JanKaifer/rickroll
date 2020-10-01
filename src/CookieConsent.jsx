import React from "react";

const CookieConsent = () => {
  return (
    <div>
      <p style={{ maxWidth: "20rem" }}>
        This site uses cookies. We kindly ask you to accept our{" "}
        <a href="#cookie-policy">cookie policy</a> to continue.
      </p>
      <button className="button">accept</button>
    </div>
  );
};

export default CookieConsent;
