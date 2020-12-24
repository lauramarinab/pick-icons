import { useEffect, useState } from "react";

export const useListingScroll = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [listingHasScrolled, setListingHasScrolled] = useState(false);

  useEffect(() => {
    const listIcon = document.getElementById("list-icons");
    if (listIcon) {
      document.addEventListener("scroll", () => {
        setListingHasScrolled(listIcon.getBoundingClientRect().top < 0);
        setScrollTop(listIcon.getBoundingClientRect().top);
        // console.log(listIcon.getBoundingClientRect());
      });
    }
  }, []);

  return {
    listingHasScrolled,
    scrollTop,
  };
};
