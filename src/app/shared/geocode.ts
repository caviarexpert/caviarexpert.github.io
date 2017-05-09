import { LatLng } from "leaflet";

export class GeocodeResponse {
    constructor ( public results : GeocodeResult[], status? : string){}
}

export class GeocodeResult {
    constructor (public address_components : AddressComponent[], public formatted_address : string,
            geometry : GeocodeGeometry, place_id : string, types : string[]){}
}

export class AddressComponent {
    constructor (public long_name : string, public short_name : string, public types : string[] ){}
}

export class GeocodeGeometry {
    constructor (bounds : GeocodeBounds, viewport : GeocodeBounds, location : LatLng, location_type : string){}
}

export class GeocodeBounds {
    constructor ( northeast : LatLng, southwest : LatLng){}
}

export class AddressObject {
    constructor ( public geocodeResult : GeocodeResult){}
    get formattedAddress() : string {
        return this.geocodeResult.formatted_address;
    }
    
    get streetNumber() : string {
        let street_number_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "street_number"));
        return street_number_of_address_component ? street_number_of_address_component.long_name : "";
    }
    
    get premise() : string {
        let premise_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "premise"));
        return premise_of_address_component ? premise_of_address_component.long_name : "";
    }
    
    get buildingNumber() : string {
        let streetNumber = this.streetNumber, premise = this.premise;
        let delimiter = streetNumber && premise ? "/" : "";
        return premise + delimiter + streetNumber;
    }
    
    get route() : string {
        let route_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "route"));
        return route_of_address_component ? route_of_address_component.long_name : "";
    }
    get locality() : string {
        let locality_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "locality"));
        return locality_of_address_component ? locality_of_address_component.long_name : "";
    }
    
    get postalCode() : string {
        let postal_code_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "postal_code"));
        return postal_code_of_address_component ? postal_code_of_address_component.long_name : "";
    }

    get countryCode() : string {
        let country_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "country"));
        return country_of_address_component ? country_of_address_component.short_name : "";
    }
    
    get areaLevel2() : string {
        let administrative_area_level_2_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "administrative_area_level_2"));
        return administrative_area_level_2_of_address_component ? administrative_area_level_2_of_address_component.long_name : "";
    }
    
    get areaLevel2Short() : string {
        let administrative_area_level_2_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "administrative_area_level_2"));
        return administrative_area_level_2_of_address_component ? administrative_area_level_2_of_address_component.short_name : "";
    }
    
    get areaLevel1() : string {
        let administrative_area_level_1_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "administrative_area_level_1"));
        return administrative_area_level_1_of_address_component ? administrative_area_level_1_of_address_component.long_name : "";
    }
    
}