import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_services/api/auth.service";
import { ConfirmService } from "src/app/_services/helpers/confirm.service";
import { GeneralService } from "src/app/_services/general.service";
import { HelpersService } from "../../../../_services/helpers.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  logoText = "Logo";

  constructor(
    private confirmService: ConfirmService,
    private router: Router,
    private authService: AuthService,
    public generalService: GeneralService,
    public helpers: HelpersService
  ) {}

  fillerNav: any[] = [
    {
      link: "users",
      text: "Users",
      icon: "person",
    },
    {
      link: "roles",
      text: "Roles",
      icon: "people",
    },
    {
      link: "categories",
      text: "Categories",
      icon: "category",
    },
    {
      link: "goods",
      text: "Goods",
      icon: "inventory_2",
    },
  ];

  ngOnInit(): void {}

  logout(): void {
    this.confirmService.setConfirm({
      accept: () => {
        this.authService.logout().subscribe(() => {
          localStorage.removeItem("credentials");
          this.router.navigateByUrl("/auth").then((r) => r);
        });
      },
      title: "Logout!",
      message: "Are you sure you want to exit?",
    });
  }

  activeLink(link: string): boolean {
    const [, , currentLink] = this.router.url.split("/");
    return currentLink === link;
  }

  toggleSideBar(): void {
    this.generalService.toggleSideBar();
  }

  t(locale: string): string {
    return this.helpers
      .localization()
      .translate(`${locale.toLowerCase()}.title`);
  }
}
