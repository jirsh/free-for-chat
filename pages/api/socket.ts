import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "types/next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any;
        res.socket.server.io = new ServerIO(httpServer, {
            path: "/api/socket"
        });
    }
    res.end();
}
  
