import React, { useState, useEffect, Fragment } from "react";
import { IntlProvider } from "react-intl";

const I18nProvider = ({ children, locale = "en" }) => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    try {
      const newMessages = require(`./messages/${locale.slice(0, 2)}.json`);
      setMessages(newMessages);
    } catch (error) {
      console.log("I18nProvider -> error", error);
      const newMessages = require(`./messages/en.json`);
      setMessages(newMessages);
    }
    return () => {};
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages} textComponent={Fragment}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
