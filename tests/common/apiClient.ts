import { APIRequestContext } from "@playwright/test";
import { Post } from "./types";

export class ApiClient {
  readonly baseURL: string = `https://jsonplaceholder.typicode.com`;
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async get(urlPortfix: string) {
    return await this.request.get(`${this.baseURL}/${urlPortfix}`);
  }

  public async post(urlPortfix: string, post: Post) {
    return await this.request.post(`${this.baseURL}/${urlPortfix}`, { data: post });
  }

  public async put(urlPortfix: string, post: Post) {    
    return await this.request.put(`${this.baseURL}/${urlPortfix}`, { data: post });
  }

  public async patch(urlPortfix: string, post: Post) {    
    return await this.request.put(`${this.baseURL}/${urlPortfix}`, { data: post });
  }

  public async delete(urlPortfix: string, id: number) {
    return await this.request.delete(`${this.baseURL}/${urlPortfix}/${id}`);
  }
}