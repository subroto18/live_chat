import React, { useEffect, useState } from "react";
import Api from "../api/Api";

export const Chat = () => {
  const [chatData, setChatData] = useState({
    loading: false,
    data: [],
    apiError: false,
  });
  useEffect(() => {
    performApi();
  }, []);

  const performApi = async () => {
    // loading phase

    setChatData((pre) => {
      return { ...pre, loading: true, data: [], apiError: false };
    });

    try {
      let result = await Api().get("/chats");
      let response = await result.data;

      // api success response

      setChatData((pre) => {
        return { ...pre, loading: false, data: response, apiError: false };
      });
    } catch {
      // api failed response

      setChatData((pre) => {
        return { ...pre, loading: false, data: [], apiError: true };
      });
    }
  };

  return <div></div>;
};
