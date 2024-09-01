"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const src_1 = require("../src");
const maps_api_1 = require("../src/maps-api");
jest.mock('../src/maps-api', () => ({
    getPlaceAutocomplete: jest.fn(),
}));
(0, globals_1.describe)('getAutoCompleteDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.TOMTOM_API_KEY = 'mock-api-key';
    });
    it('returns correct response ', () => __awaiter(void 0, void 0, void 0, function* () {
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
        maps_api_1.getPlaceAutocomplete.mockResolvedValue(mockResponse);
        const res = yield (0, src_1.getAutoCompleteDetails)('Herston Road');
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
        expect(maps_api_1.getPlaceAutocomplete).toHaveBeenCalledTimes(1);
    }));
    it('when exception, returns exception', () => __awaiter(void 0, void 0, void 0, function* () {
        maps_api_1.getPlaceAutocomplete.mockImplementation(() => {
            throw Error("API Error");
        });
        yield expect((0, src_1.getAutoCompleteDetails)('Herston Road')).rejects.toThrow();
    }));
    it('when no tomtomresponse, returns empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        maps_api_1.getPlaceAutocomplete.mockResolvedValue(undefined);
        const res = yield (0, src_1.getAutoCompleteDetails)('Herston Road');
        expect(res !== null && res !== void 0 ? res : []).toEqual([]);
    }));
    it('when no results, returns empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        maps_api_1.getPlaceAutocomplete.mockResolvedValue([]);
        const res = yield (0, src_1.getAutoCompleteDetails)('Non-existent address');
        expect(res).toEqual([]);
    }));
});
