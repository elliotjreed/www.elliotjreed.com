import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { pageview } from "react-ga";

export const usePageView: () => void = () => {
  const location = useLocation();
  useEffect((): void => {
    pageview(location.pathname + location.search);
  }, [location]);
};
