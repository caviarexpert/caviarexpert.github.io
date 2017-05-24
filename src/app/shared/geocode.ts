import { LatLng } from "leaflet";

export class GeocodeResponse {
    constructor ( public results : GeocodeResult[], status? : string){}
}

export class GeocodeResult {
    constructor (public address_components : AddressComponent[], public formatted_address : string,
            public geometry : GeocodeGeometry, place_id : string, types : string[]){}
}

export class AddressComponent {
    constructor (public long_name : string, public short_name : string, public types : string[] ){}
}

export class GeocodeGeometry {
    constructor (bounds : GeocodeBounds, public viewport : GeocodeBounds, public location : LatLng, 
        public location_type : string){}
}

export class GeocodeBounds {
    constructor ( public northeast : LatLng, public southwest : LatLng){}
}

export class AddressObject {
    constructor ( public geocodeResult : GeocodeResult){}
    get formattedAddress() : string {
        return this.geocodeResult ? this.geocodeResult.formatted_address : "";
    }
    
    get streetNumber() : string {
        if(!this.geocodeResult) return "";
        let street_number_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "street_number"));
        return street_number_of_address_component ? street_number_of_address_component.long_name : "";
    }
    
    get premise() : string {
        if(!this.geocodeResult) return "";
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
        if(!this.geocodeResult) return "";
        let route_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "route"));
        return route_of_address_component ? route_of_address_component.long_name : "";
    }
    get locality() : string {
        if(!this.geocodeResult) return "";
        let locality_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "locality"));
        return locality_of_address_component ? locality_of_address_component.long_name : this.postalTown;
    }

    /**
     * auxiliry to locality()
     */
    get postalTown(): string {
        if(!this.geocodeResult) return "";
        let postal_town_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "postal_town"));
        return postal_town_of_address_component ? postal_town_of_address_component.long_name : this.areaLevel3;
    }
    /**
     * auxliary to postalTown()
     */
    get areaLevel3(): string {
        if(!this.geocodeResult) return "";
        let administrative_area_level_3_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "administrative_area_level_3"));
        return administrative_area_level_3_of_address_component ? administrative_area_level_3_of_address_component.long_name : "";
    }
    
    get postalCode() : string {
        if(!this.geocodeResult) return "";
        let postal_code_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "postal_code"));
        return postal_code_of_address_component ? postal_code_of_address_component.long_name : "";
    }

    get countryCode() : string {
        if(!this.geocodeResult) return "";
        let country_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "country"));
        return country_of_address_component ? country_of_address_component.short_name : "";
    }
    
    get areaLevel2() : string {
        if(!this.geocodeResult) return "";
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
        if(!this.geocodeResult) return "";
        let administrative_area_level_1_of_address_component = this.geocodeResult.address_components
            .find( addr => addr.types.some( atype => atype == "administrative_area_level_1"));
        return administrative_area_level_1_of_address_component ? administrative_area_level_1_of_address_component.long_name : "";
    }

    get viewport(): GeocodeBounds {
        if(!this.geocodeResult) return null;
        return this.geocodeResult.geometry.viewport;
    }
    
}