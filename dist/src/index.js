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
exports.getAutoCompleteDetails = void 0;
const maps_api_1 = require("./maps-api");
function mapper(tomtomResponse) {
    var _a;
    return (((_a = tomtomResponse === null || tomtomResponse === void 0 ? void 0 : tomtomResponse.results) === null || _a === void 0 ? void 0 : _a.map((element) => ({
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
    }))) || []);
}
function getAutoCompleteDetails(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.TOMTOM_API_KEY;
        const countryCode = "AU";
        if (!address || address.trim() === '') {
            throw new Error('Address must be a non-empty string');
        }
        if (!apiKey) {
            throw new Error('API key is required');
        }
        try {
            const res = yield (0, maps_api_1.getPlaceAutocomplete)(apiKey, address, countryCode);
            return mapper(res);
        }
        catch (error) {
            console.error(`Failed to fetch data: ${error.message}}`);
            throw error;
        }
    });
}
exports.getAutoCompleteDetails = getAutoCompleteDetails;
