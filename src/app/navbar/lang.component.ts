import { Component, OnInit } from "@angular/core";
import { Lang } from "./model/lang";
import {TranslateService } from '@ngx-translate/core';

const lang_map = {
    ru: "русский",
    en: "English",
    es: "español",
    de: "Deutsch",
    fr: "français",
    it: "italiano"
};

@Component({
    selector: "lang-selector",
    moduleId: module.id,
    templateUrl: "./lang.component.html"
})
export class LangComponent implements OnInit {
    
    private working_langs: Lang[] = [];
    private currentLang: Lang;

    constructor(private translateService: TranslateService){}

    ngOnInit(){
        this.working_langs = this.translateService.getLangs()
            .filter( code => lang_map.hasOwnProperty(code))
            .map ( code => new Lang(code, lang_map[code]));
        this.currentLang = this.working_langs
            .find ( lang => lang.id === this.translateService.currentLang);
    }

    get langs():Lang[]{
        return this.working_langs;
    }

    get current():Lang{
        return this.currentLang;
    }
    set current(lang:Lang){
        this.currentLang = lang;
        this.translateService.use(lang.id);
    }
}