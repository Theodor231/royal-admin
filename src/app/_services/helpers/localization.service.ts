import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LocalizationService {
  activeLanguage = "en";
  readonly LANGUAGES = {
    ru: "ru",
    ro: "ro",
    en: "en",
  } as any;

  messages = {} as any;
  onLanguageChange = new EventEmitter(true);

  constructor(private router: Router) {
    const [, currentLang] = router.url.split("/");
    this.activeLanguage = currentLang;
    this.loadLocaleMessages();
    this.onLanguageChange.subscribe((lang: any) => {
      if (lang) {
        const url = router.url.replace(this.activeLanguage, lang);
        this.activeLanguage = lang;
        location.replace(url);
      }
    });
  }

  loadLocaleMessages(): void {
    const locales = require.context(
      "../../modules",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );

    const globalLocales = require.context(
      "../../",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );

    const messages = {
      en: {},
      ru: {},
      ro: {},
    };

    locales.keys().forEach((key) => {
      const [, lang] = key.match(/([A-Za-z0-9-_]+)\./i) as Array<string>;
      messages[lang] = { ...messages[lang], ...locales(key) };
    });

    globalLocales.keys().forEach((key) => {
      const [, lang] = key.match(/([A-Za-z0-9-_]+)\./i) as Array<string>;
      messages[lang] = { ...messages[lang], ...globalLocales(key) };
    });

    this.messages = messages;
  }

  translate(translate): string {
    const locales = translate.split(".");
    let dict = this.messages[this.activeLanguage];

    for (const key of locales) {
      if (dict && dict[key]) {
        dict = dict[key];
      } else {
        dict = translate;
      }
    }
    return dict;
  }
}
