import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { createDebugger } from "../utils/debugConfig";
import axios, { HttpStatusCode } from "axios";
config();

const middlewareDebugger = createDebugger("jwt");

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    //auth server us on the StaySure_Microservicies project, so the token will be in the header
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (token == null) {
        middlewareDebugger("Access denied. No token provided.");
        return res
            .status(HttpStatusCode.Unauthorized)
            .send("Access denied. No token provided.");
    } else {
        axios.get(`${process.env.AUTH_SERVER}/api/authorized`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status == HttpStatusCode.Ok) {
                    next();
                } else {
                    middlewareDebugger("Access denied. Invalid token.");
                    return res
                        .status(HttpStatusCode.Unauthorized)
                        .send("Access denied. Invalid token.");
                }
            })
            .catch(() => {
                middlewareDebugger("Access denied. Invalid token.");
                return res
                    .status(HttpStatusCode.Unauthorized)
                    .send("Access denied. Invalid token.");
            });
    }
}