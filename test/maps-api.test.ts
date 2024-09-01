import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getPlaceAutocomplete } from '../src/maps-api';

config();
const apiKey = process.env.TOMTOM_API_KEY as string;

// These are end-to-end tests and need an api key
describe('getPlaceAutocomplete', () => {
  it('handles no results', async () => {
    const res = await getPlaceAutocomplete(
      apiKey,
      'asfasffasfasafsafs',
      'AU'
    );
    expect(res.results).toStrictEqual([]);
  });

  it('handles error', async () => {
    expect(
      getPlaceAutocomplete(apiKey, '', 'AU')
    ).rejects.toThrow();
  });
});
