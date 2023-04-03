declare module 'villagers' {
  export type VillagerType = {
    img_url: string;
    birthday_day: string;
    birthday_month: string;
    favorite_color: string[];
    favorite_style: string[];
    gender: string;
    hobby: string;
    name_kr: string;
    personality: string;
    species: string;
    rank: {
      feature: number;
      favorite: number;
    };
  };
  export type VillagerParams = {
    [key: string]: string | string[];
  };
}
