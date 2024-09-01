import axios from 'axios';

type TomtomAddress = {
  streetNumber: number;
  streetName?: string;
  country?: string;
  countryCode?: string;
  freeformAddress?: string;
  municipality?: string;
  neighbourhood?: string;
  postalCode?: string;
  localName?: string;
};

export type TomtomResult = {
  id: string;
  address: TomtomAddress;
};

export type TomtomResponse = {
  results: TomtomResult[];
};

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string,
  countryCode: string
): Promise<TomtomResponse> {

//   const res = await axios.get(
//     `https://api.tomtom.com/search/2/search/${address}.json?key=${key}&limit=100&&countrySet=AU`
//   );

    const res = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json`, {
        params: {
            key,
            limit: 100,
            countryCode
        }
    });

    return res.data;
}
