import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getAutoCompleteDetails } from '../src';

config();

describe('getAutoCompleteDetails', () => {
  it('returns a promise', () => {
    const res = getAutoCompleteDetails('Herston Road');
    expect(res).toBeInstanceOf(Promise);
  });

  it('can fetch from the autocomplete api', async () => {
    const res = await getAutoCompleteDetails('Herston Road');

    const firstRes = res[0];
    expect(firstRes).toHaveProperty('placeId');
    expect(firstRes).toHaveProperty('streetNumber');
    expect(firstRes).toHaveProperty('countryCode');
    expect(firstRes).toHaveProperty('country');
    expect(firstRes).toHaveProperty('freeformAddress');
    expect(firstRes).toHaveProperty('municipality');
  });

  it('address cannot be empty', async () => {
    await expect(getAutoCompleteDetails('')).rejects.toThrow('Address must be a non-empty string');
  });

  it('address cannot be null', async () => {
    await expect(getAutoCompleteDetails(null)).rejects.toThrow('Address must be a non-empty string');
  });

  it('address cannot be null', async () => {
    await expect(getAutoCompleteDetails(undefined)).rejects.toThrow('Address must be a non-empty string');
  });
});
