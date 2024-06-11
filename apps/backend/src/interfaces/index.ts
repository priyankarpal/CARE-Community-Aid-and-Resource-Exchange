import { Request as ExpressRequest, Response } from "express";
// @ts-ignore
export interface RequestWithFile extends ExpressRequest {
  file: unknown;
}
