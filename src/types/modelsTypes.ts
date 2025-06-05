export type PageDataType = {
    _id: string;
    incrementalSize: number;
    lastUpdated: Date;
    currentPosition: number;
    totalPages: number;
    type: string;
};

export type SlugType = {
  _id: string;
    type: string;
  slug: string;
  createdAt: Date;
};