import * as _ from "lodash";
import { UpperCasePipe } from "@angular/common";
import { PipeTransform } from "@angular/core";
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
}

export class AddressLine {
  public pipes : PipeTransform[] = [];
  private dasFelder : string[];
  public result : string;
  constructor(public template : string, pipes? : PipeTransform[]){
    if(!!pipes) this.pipes = pipes;
  }
  get fields() : string[]{
    return !!this.dasFelder ? this.dasFelder : [];
  }
  set fields( theFields : string[]) {
      this.dasFelder = theFields;
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
            new AddressLine("<%-upuAddress.deliveryPoint%>"),
            new AddressLine("<%-upuAddress.additionalGeoInfo%>"),
            new AddressLine ("<%-upuAddress.streetNumber%> <%-upuAddress.route%>", [ AddressTemplate.uppercase ]),
            new AddressLine( "<%-upuAddress.poBox%>", [ AddressTemplate.uppercase ] ),
            new AddressLine("<%-upuAddress.postalCode%> <%-upuAddress.locality%>", [ AddressTemplate.uppercase ]),
            new AddressLine("<%-upuAddress.country%>", [ AddressTemplate.uppercase ])
        ]
    }

    public static DE = {
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
        lines : [
            new AddressLine("<%-address.addressee%>"),
            new AddressLine ("<%-address.streetNumber%>&nbsp;<%-address.route%>", [ AddressTemplate.uppercase ]),
            new AddressLine( "<%-address.poBox%>", [ AddressTemplate.uppercase ] ),
            new AddressLine("<%-address.postalCode%>&nbsp;<%-address.locality%>", [ AddressTemplate.uppercase ])
        ]
    }
}