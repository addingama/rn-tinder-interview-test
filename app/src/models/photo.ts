export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface PhotoResponse {
  memberId: string;
  photos: Photo[];
}