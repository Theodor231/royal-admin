import { Component, OnInit } from "@angular/core";
import { LocalizationService } from "src/app/_services/helpers/localization.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "lang-switcher",
  templateUrl: "./lang-switcher.component.html",
  styleUrls: ["./lang-switcher.component.scss"],
})
export class LangSwitcherComponent implements OnInit {
  showLanguages = false as boolean;

  items = [
    {
      value: "ro",
      text: "Romana",
      icon: "assets/images/countries/moldova.svg",
    },
    {
      value: "en",
      text: "English",
      icon: "assets/images/countries/united-kingdom.svg",
    },
    {
      value: "ru",
      text: "Русский",
      icon: "assets/images/countries/russia.svg",
    },
  ];

  activeLanguage = {
    value: "ro",
    text: "RO",
    icon: "assets/images/countries/moldova.svg",
  };

  constructor(private localization: LocalizationService) {}

  ngOnInit(): void {
    this.activeLanguage = this.items.find(
      (item: any) => item.value === this.localization.activeLanguage
    );
  }

  toggle(): void {
    this.showLanguages = !this.showLanguages;
  }

  changeLanguage(language: any): void {
    this.activeLanguage = language;
    this.localization.onLanguageChange.next(language.value);
    this.toggle();
  }
}
