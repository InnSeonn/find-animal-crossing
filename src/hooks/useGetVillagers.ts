import axios from 'axios';
import { useEffect, useState } from 'react';

export type VillagerType = {
  name: string;
  id: string;
  image_url: string;
  species: string;
  personality: string;
  gender: string;
  birthday_month: string;
  birthday_day: string;
  nh_details: object;
};

export type VillagerParams = {
  [key: string]: string | string[];
};

const useGetVillagers = (params: VillagerParams): VillagerType[] | undefined => {
  const [data, setData] = useState();

  const getVillagers = async () => {
    const KEY = 'a63520c8-a658-423a-9dac-4c575707c5c3';
    try {
      const result = await axios.get('https://api.nookipedia.com/villagers?game=nh&nhdetails=true&', {
        params: params,
        headers: {
          'X-API-KEY': KEY,
          'Accept-Version': '1.5.0',
        },
      });
      setData(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getVillagers();
  }, []);

  if (data) {
    return data;
  }
};

export default useGetVillagers;
