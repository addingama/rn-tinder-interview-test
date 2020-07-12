import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { Member, Photo, PhotoResponse } from "src/models";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json'
      }
    })
  }

  /**
   * For the test and time, all api call error state not handled for now
   */
  async getMembers(): Promise<Member[]> {
    const response: ApiResponse<any> = await this.apisauce.get(
      '/member');

    return response.data as Member[];
  }
  
  async getMember(id: number): Promise<Member> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(
        '/member/' + id);
      if (response.ok) {
        return response.data as Member;
      } else {
        throw new Error("Something went wrong");
        
      }
        
    } catch (error) {
      console.log(error.message)
    }
    
    
  }

  async getPhotos(memberId: number): Promise<Photo[]> {
    const response: ApiResponse<PhotoResponse[]> = await this.apisauce.get(
      '/photos/?memberId=' + memberId);

    if (response.ok && response.data && response.data.length > 0) {
      // I am sure that the first object is user data
      return response.data[0].photos;
    }
    return [];
  }
}