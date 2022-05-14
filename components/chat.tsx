import { useEffect } from "react";
import { connect } from "socket.io-client";

const Seperator = () => <div className="border border-b-white" />;

const Chat = () => {
    useEffect((): any => {
        const socket = connect("http://127.0.0.1:3000", {
            path: "/api/socket"
        });

        socket.on("connect", () => console.log("connected to the server"));


        return () => socket && socket.disconnect();
    }, []);
  return (
    <div className="">
    </div>
  );
};

export default Chat;
