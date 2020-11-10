import React from "react";

const useCheckAdBlocker = () => {
  const [adBlockerActive, setAdBlockerActive] = React.useState(false);

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

  return adBlockerActive;
};

export { useCheckAdBlocker };
