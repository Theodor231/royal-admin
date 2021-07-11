import { Injectable } from "@angular/core";
import { AuthService } from "./api/auth.service";
import { RolesService } from "./api/roles.service";
import { UsersService } from "./api/users.service";
import { ProductsService } from "./api/products.service";
import { CategoriesService } from "./api/categories.service";
import { NewsService } from "./api/news.service";
import { GoodsService } from "./api/goods.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private rolesService: RolesService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private newsService: NewsService,
    private goodsService: GoodsService
  ) {}

  users = () => this.usersService;
  auth = () => this.authService;
  roles = () => this.rolesService;
  products = () => this.productsService;
  categories = () => this.categoriesService;
  news = () => this.newsService;
  goods = () => this.goodsService;
}
