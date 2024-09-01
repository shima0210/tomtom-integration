import errorMap from 'zod/lib/locales/en';
import { getPlaceAutocomplete, TomtomResponse } from './maps-api';
import { error } from 'console';

type AutoCompleteResponse = {
  placeId: string;
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

function mapper(tomtomResponse?: TomtomResponse): AutoCompleteResponse[] {
  return (
    tomtomResponse?.results?.map(
      (element) =>
        ({
          placeId: element.id,
          streetNumber: element.address.streetNumber,
          streetName: element.address.streetName,
          country: element.address.country,
          countryCode: element.address.countryCode,
          freeformAddress: element.address.freeformAddress,
          municipality: element.address.municipality,
          neighbourhood: element.address.neighbourhood,
          postalCode: element.address.postalCode,
          localName: element.address.localName,
        }) as AutoCompleteResponse
    ) || []
  );
}

export async function getAutoCompleteDetails(
  address: any
): Promise<AutoCompleteResponse[]> {
  const apiKey = process.env.TOMTOM_API_KEY;
  const countryCode = "AU";

  if (!address || address.trim() === '') {
    throw new Error('Address must be a non-empty string');
  }

  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const res = await getPlaceAutocomplete(apiKey as string, address, countryCode);
    return mapper(res);
  }
  catch(error) {
    console.error(`Failed to fetch data: ${(error as Error).message}}`)
    throw error;
  }
}
