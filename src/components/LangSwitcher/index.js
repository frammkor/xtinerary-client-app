import React, { useContext } from "react";
import { LOCALES } from "../../providers/intl";

import { AppContext } from "../../providers/context";

import { saveToStorage } from "../../utils/sessionStorage";

export default () => {
  const { dispatch } = useContext(AppContext);

  const setLanguage = (siteLang) => {
    saveToStorage("siteLang", siteLang);
    dispatch({ type: "setLang", siteLang });
  };

  return (
    <div>
      {Object.keys(LOCALES).map((locale) => {
        return (
          <button
            key={locale}
            onClick={() => {
              setLanguage(LOCALES[locale]);
            }}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
};
