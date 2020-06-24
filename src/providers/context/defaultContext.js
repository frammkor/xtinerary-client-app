import { LOCALES } from "../intl";
import THEMES from "../themes/themesList";
import { getFromStorage } from "../../utils/sessionStorage";

export default {
  // themeName: getFromStorage("themeName") || THEMES.APPLE,
  siteLang: getFromStorage("siteLang") || LOCALES.ENGLISH,
};
