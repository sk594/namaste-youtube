import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../utils/chatSlice";
import { generateRandomName, generateRandomString } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    //api polling
    const i = setInterval(() => {
      dispatch(
        addMessages({
          name: generateRandomName(),
          message: generateRandomString(15) + "✨",
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="w-full h-[450px] ml-2 p-2 border border-black bg-gray-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessages({
              name: "Sanjay Gurjar",
              message: liveMessage,
            })
          );

          setLiveMessage("")
        }}
        className="w-full p-2 ml-2 border border-black rounded-b-xl"
      >
        <input
          className="w-[14rem]"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-3 bg-green-100 rounded-lg">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
