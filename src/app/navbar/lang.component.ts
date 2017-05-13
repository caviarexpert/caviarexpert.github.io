import { Component, OnInit } from "@angular/core";
import { Locale } from "./model/lang";
import { LocaleService } from "angular-l10n";

const lang_map = {
    ru: { shortcut: "ru", name: "русский", country: "RU" },
    en: { shortcut: "en", name: "English", country: "UK" },
    es: { shortcut: "es", name:"español", country: "ES" },
    de: { shortcut: "de", name: "Deutsch", country: "DE" },
    fr: { shortcut: "fr", name: "français", country: "FR" },
    it: { shortcut: "it", name: "italiano", country: "IT" }
};

@Component({
    selector: "lang-selector",
    moduleId: module.id,
    templateUrl: "./lang.component.html"
})
export class LangComponent implements OnInit {
    
    private working_langs: Locale[] = [];
    private currentLang: Locale;

    constructor(private localeService: LocaleService){}

    ngOnInit(){
        this.working_langs = this.localeService.getConfiguration().languageCodes
            .filter( langCode => lang_map.hasOwnProperty(langCode.code))
            .map ( langCode => new Locale(langCode.code, lang_map[langCode.code].country, lang_map[langCode.code].shortcut, lang_map[langCode.code].name));
        this.currentLang = this.working_langs
            .find ( lang => lang.languageCode === this.localeService.getCurrentLanguage());
    }

    get langs():Locale[]{
        return this.working_langs;
    }

    get current():Locale{
        return this.currentLang;
    }
    set current(lang: Locale){
        this.currentLang = lang;    
        this.localeService.setDefaultLocale(lang.languageCode, lang.countryCode);
    }
}