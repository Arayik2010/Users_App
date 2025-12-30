import axios from "axios";

export default class UsersService {
  private static instance: UsersService;

  public static getInstance(): UsersService {
    if (!this.instance) {
      this.instance = new UsersService();
    }
    return this.instance;
  }

  private constructor() {
    console.log("this is a private constarutor");
  }

  public async create(params: any) {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/user",
        params
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async update(id: any, params: any) {
    try {
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`,
        params
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async listUsers(id?: any, cache?: any) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `/user/${id ? id : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cache: cache,
          },
        }
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  public async searchListItem(name: string) {
    try {
        const response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + `/userName?name=${name}`
        );
        return response;
    } catch (e) {
        throw e
    }
}

  public async itemDelete(id: any) {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`
      );
      return response;
    } catch (e) {
      throw e;
    }
  }
}
