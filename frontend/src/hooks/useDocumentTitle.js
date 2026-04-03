import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { globalContent } from "../data/siteContent";

export function useDocumentTitle(title) {
  const { pick } = useLanguage();

  useEffect(() => {
    document.title = `${pick(title)} | ${pick(globalContent.schoolName)}`;
  }, [pick, title]);
}
