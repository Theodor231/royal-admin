import { Component, OnInit } from "@angular/core";
import colors from "src/app/static/colors.json";

@Component({
  selector: "app-theme",
  templateUrl: "./theme.component.html",
  styleUrls: ["./theme.component.scss"],
})
export class ThemeComponent implements OnInit {
  showTheme = false;
  constructor() {}

  theme = {
    isDark: false as boolean,
    primaryColor: "#3f51b5" as string,
  };

  primaryColors = [
    "#3f51b5",
    "#ff6d00",
    "#4eb94c",
    "#43bfc3",
    "#b985c2",
  ] as Array<string>;

  ngOnInit(): void {
    if (localStorage.getItem("theme")) {
      this.theme = JSON.parse(localStorage.getItem("theme"));

      if (this.theme.isDark) {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
    } else {
      this.setTheme("light");
    }
  }

  toggleTheme() {
    this.showTheme = !this.showTheme;
  }

  setTheme(theme: string): void {
    document.documentElement.style.setProperty(
      "--primary",
      this.theme.primaryColor
    );
    for (const color in colors[theme]) {
      document.documentElement.style.setProperty(color, colors[theme][color]);
    }

    this.theme.isDark = theme === "dark";
    localStorage.setItem("theme", JSON.stringify(this.theme));
  }
  setPrimaryColor(color: string): void {
    this.theme.primaryColor = color;
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("theme", JSON.stringify(this.theme));
  }
}
