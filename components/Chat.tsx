"use client";
import { FormEvent, useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(text);
  };
  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr, auto]">
      <div className="">
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            name="message"
            id="message"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            placeholder="Message GeniusGPT"
          />
          <button className="btn btn-primary join-item uppercase" type="submit">
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
