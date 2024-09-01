import { describe } from '@jest/globals';
import { getAutoCompleteDetails } from '../src';
import { getPlaceAutocomplete } from '../src/maps-api';

jest.mock('../src/maps-api', () => ({
  getPlaceAutocomplete: jest.fn(),
}));

describe('getAutoCompleteDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TOMTOM_API_KEY = 'mock-api-key';
  });

  it('returns correct response ', async () => {
    const mockResponse = {
      results: [
        {
          id: '123',
          address: {
            streetNumber: 1,
            streetName: 'Herston Road',
            country: 'Australia',
            countryCode: 'AU',
            freeformAddress: '1 Herston Road, Brisbane, Australia',
            municipality: 'Brisbane',
            neighbourhood: 'Herston',
            postalCode: '4006',
            localName: 'Herston',
          }
        }
      ]
    };
    (getPlaceAutocomplete as jest.Mock).mockResolvedValue(mockResponse);

    const res = await getAutoCompleteDetails('Herston Road');

    expect(res).toEqual([
      {
        country: 'Australia',
        countryCode: 'AU',
        freeformAddress: '1 Herston Road, Brisbane, Australia',
        localName: 'Herston',
        municipality: 'Brisbane',
        neighbourhood: 'Herston',
        placeId: '123',
        postalCode: '4006',
        streetName: 'Herston Road',
        streetNumber: 1,
      },
    ]);
    expect(getPlaceAutocomplete).toHaveBeenCalledTimes(1);
  });

  it('when exception, returns exception', async () => {
    (getPlaceAutocomplete as jest.Mock).mockImplementation(() => {
      throw Error("API Error");
    });

    await expect(getAutoCompleteDetails('Herston Road')).rejects.toThrow();
  });

  it('when no tomtomresponse, returns empty array', async () => {
    (getPlaceAutocomplete as jest.Mock).mockResolvedValue(undefined);

    const res = await getAutoCompleteDetails('Herston Road');

    expect(res ?? []).toEqual([]);
  });

  it('when no results, returns empty array', async () => {
    (getPlaceAutocomplete as jest.Mock).mockResolvedValue([]);

    const res = await getAutoCompleteDetails('Non-existent address');

    expect(res).toEqual([]);
  });
});
