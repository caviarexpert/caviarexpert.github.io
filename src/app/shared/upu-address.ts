import * as _ from "lodash";
import { UpperCasePipe } from "@angular/common";
import { PipeTransform } from "@angular/core";
import { AddressObject } from "./geocode";
export class UpuAddress {
  public addressee : string;
  public deliveryPoint : string;
  public additionalGeoInfo : string;
  public streetNumber : string;
  public premise : string;
  public route : string;
  public poBox : string;
  public postalCode : string;
  public locality : string;
  public subLocality : string;
  public countryCode : string;
  public country : string;

  public static fromAddress( address : AddressObject) : UpuAddress {
    const upuAddress : UpuAddress = new UpuAddress();
    upuAddress.route = address.route;
    upuAddress.streetNumber = address.streetNumber;
    upuAddress.premise = address.premise;
    upuAddress.postalCode = address.postalCode;
    upuAddress.locality = address.locality;
    upuAddress.countryCode = address.countryCode;
    upuAddress.subLocality = address.areaLevel2Short;
    return upuAddress;
  }
  public toString() : string {
      return AddressTemplate.formatAddress(this)
        .map ( addrLine => addrLine.result)
        .filter( result => !!result)
        .reduce ( (prev, curr ) => prev.length > 0 ? prev + ", " + curr : curr, "")
  }
}

export class AddressLine {
  public pipes : PipeTransform[] = [];
  private dasFelder : string[];
  private _optional : boolean;
  public result : string;
  constructor(public template : string, pipes? : PipeTransform[], optional? : boolean){
    if(!!pipes) this.pipes = pipes;
    if(!!optional) this._optional = optional;
  }
  get fields() : string[]{
    return !!this.dasFelder ? this.dasFelder : [];
  }
  set fields( theFields : string[]) {
      this.dasFelder = theFields;
  }
  get optional() : boolean {
      return this._optional;
  }
}

export class AddressTemplate {

    private static uppercase : PipeTransform = new UpperCasePipe();

    private static templateRegex : RegExp = /(<%[-=]\s*)(.*?)(\s*%>)/g

    private static processAddressLines( lines : AddressLine[], upuAddress : UpuAddress) : AddressLine[] {
      return lines.map(line => {
            let theLine: string = _.template(line.template)({ "upuAddress": upuAddress });
            if(theLine.trim().length > 0){
                line.pipes.forEach ( pipe => {
                theLine = pipe.transform(theLine);
                });
                line.result = theLine;                   
            }
            let match = AddressTemplate.templateRegex.exec(line.template);
            let lineFields : string[] = [];
            while(match !== null) {
                lineFields.push(match[2]);
                match = AddressTemplate.templateRegex.exec(line.template);
            }
            line.fields = lineFields;
            return line;
        })
        .reduce ( (result, current, index) => {
            result.push(current);
            return result;
        }, []);
    }

    public static formatAddress (upuAddress : UpuAddress, translateCountryCode? : (countryCode:string) => string ) : AddressLine[] {
        let countryName;
        if(translateCountryCode){
            upuAddress.country = translateCountryCode(upuAddress.countryCode);
        }else{
            upuAddress.country = !!upuAddress.country ? upuAddress.country : upuAddress.countryCode;
        }        
        return AddressTemplate.processAddressLines( AddressTemplate.FR.lines, upuAddress);
    }

    public static FR = {
        lines : [
            new AddressLine("<%-upuAddress.addressee%>"),
            new AddressLine("<%-upuAddress.deliveryPoint%>", null, true),
            new AddressLine("<%-upuAddress.additionalGeoInfo%>", null, true),
            new AddressLine ("<%-upuAddress.streetNumber%> <%-upuAddress.route%>", [ AddressTemplate.uppercase ]),
            //new AddressLine( "<%-upuAddress.poBox%>", [ AddressTemplate.uppercase ] ),
            new AddressLine("<%-upuAddress.postalCode%> <%-upuAddress.locality%>", [ AddressTemplate.uppercase ]),
            new AddressLine("<%-upuAddress.country%>", [ AddressTemplate.uppercase ])
        ]
    }

    public static DE = {
        /*
        formatAddress : function (upuAddress : UpuAddress, translateCountryCode? : (countryCode:string) => string ) : string {
            let countryName;
            if(translateCountryCode){
                countryName = translateCountryCode(upuAddress.countryCode);
            }else{
                countryName = !!upuAddress.country ? upuAddress.country : upuAddress.countryCode;
            }
            let address : string = AddressTemplate.FR.lines
                .map(element => {
                    let tmpl = _.template(element.template);
                    let line: string = tmpl(upuAddress);
                    return line;
                })
                .filter(line => line.trim().length>0)
                .reduce ( (text, line) => {
                    return text+"<br />"+line;
                });
            return address;
        },
        */
        lines : [
            new AddressLine("<%-address.addressee%>"),
            new AddressLine ("<%-address.streetNumber%>&nbsp;<%-address.route%>", [ AddressTemplate.uppercase ]),
            //new AddressLine( "<%-address.poBox%>", [ AddressTemplate.uppercase ] ),
            new AddressLine("<%-address.postalCode%>&nbsp;<%-address.locality%>", [ AddressTemplate.uppercase ])
        ]
    }
}