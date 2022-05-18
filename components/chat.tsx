import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef, useState } from "react";
import { FaBan, FaCopy } from "react-icons/fa";
import { connect } from "socket.io-client";

type MessageType = {
  id: string;
  username: string;
  message: string;
  sent: number;
};

const Message: FC<MessageType> = (msg) => {
  const { data: session } = useSession();

  const deleteMessage = async (id: string) => {
    const resp = await fetch("/api/chat", {
      method: "DELETE",
      headers: {
        "Content-Type": "text/*",
      },
      body: id,
    });
  };

  return (
    <div className="flex rounded bg-slate-800 p-3 space-x-3">
      <div className="flex flex-col max-w-full">
        <div className="text-xl">{msg.username}</div>
        <div className="text-xs text-slate-300">
          {format(msg.sent, "MM/dd/yyyy h:m")}
        </div>
      </div>
      <div className="border-r" />
      <div className="break-words max-w-md md:max-w-4xl">{msg.message}</div>
      <div
        className="transition-colors cursor-pointer hover:text-slate-500"
        onClick={() => navigator.clipboard.writeText(msg.message)}
      >
        <FaCopy />
      </div>
      {session && (
        <div
          className="transition-colors cursor-pointer hover:text-slate-500"
          onClick={() => deleteMessage(msg.id)}
        >
          <FaBan />
        </div>
      )}
    </div>
  );
};

const Messages: FC<{ messages: MessageType[] }> = ({ messages }) => {
  return (
    <>
      {messages.length > 0 &&
        messages.map((msg) => (
          <Message
            key={msg.id}
            id={msg.id}
            username={msg.username}
            message={msg.message}
            sent={msg.sent}
          />
        ))}
    </>
  );
};

const Chat = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  useEffect((): any => {
    const socket = connect(process.env.BASE_URL || "", {
      path: "/api/socket",
    });

    fetch("/api/fetchlast").then(async (res) => {
      if (res.ok) {
        const history: MessageType[] = await res.json();
        setMessages(history);
      }
    });

    socket.on("connect", () => setConnected(true));

    socket.on("message", (msg: MessageType) => {
      setMessages((oldMsgs) => [msg, ...oldMsgs]);
    });

    socket.on("delete_message_by_id", (id: string) => {
      setMessages((oldMsgs) => oldMsgs.filter((msg) => msg.id !== id));
    });

    socket.on("clear_messages", () => {
      setMessages([]);
    });

    return () => socket.disconnect() && setConnected(false);
  }, []);

  const sendMessage = async (msg: string) => {
    if (msg.length > 0) {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "text/*",
        },
        body: message,
      });

      if (resp.ok) setMessage("");
    }

    inputRef.current?.focus();
  };

  if (!connected) return <>Connecting to the chat...</>;

  return (
    <div className="bg-slate-700 rounded-lg shadow-2xl p-3 min-h-[16rem] flex flex-col space-y-3 justify-between">
      <div className="flex flex-col-reverse space-y-reverse space-y-2 max-h-64 overflow-y-auto overflow-x-hidden">
        <Messages messages={messages} />
      </div>

      {session && (
        <form
          className="flex h-8 space-x-3 w-full md:w-1/3"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
          }}
        >
          <input
            type="text"
            className="rounded bg-slate-600 px-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputRef}
          />
          <input
            type="button"
            value="Send"
            className="transition-colors rounded bg-slate-600 px-3 cursor-pointer hover:bg-slate-500"
            onClick={() => sendMessage(message)}
          />
        </form>
      )}
    </div>
  );
};

export default Chat;
