import { MY_TOKEN_NUMBERS } from "../Constants/apiConstants";

// Get and Set the API key up because the Search API has custom rate limit rules.
export default class AppRequestInit {
  public method: string = "GET";
  public headers: Headers = new Headers();
  public mode: RequestMode = "cors";

  constructor() {
    this.headers.set("Content-Type", "text/json;charset=utf-8");
    this.headers.append("Authorization", `Bearer ${MY_TOKEN_NUMBERS}`);
  }
}