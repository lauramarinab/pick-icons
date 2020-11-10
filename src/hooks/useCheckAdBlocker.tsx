import React from "react";

const useCheckAdBlocker = () => {
  const [adBlockerActive, setAdBlockerActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkAdBlocker = async () => {
      try {
        await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
          method: "HEAD",
          mode: "no-cors",
        })
          .then((res) => setAdBlockerActive(false))
          .catch((err) => setAdBlockerActive(true));
      } catch (error) {
        setAdBlockerActive(true);
      }
    };
    checkAdBlocker();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = adBlockerActive ? "hidden" : "";
  }, [adBlockerActive]);

  return adBlockerActive;
};

export { useCheckAdBlocker };
