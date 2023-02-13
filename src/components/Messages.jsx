import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  console.log(messages);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map(
        (m) =>
          (m.text.length !== 0 || m.img) && <Message message={m} key={m.id} />
      )}
    </div>
  );
};

export default Messages;
