import { Injectable } from "@angular/core";
import { AuthService } from "./modules/auth.service";
import { RolesService } from "./modules/roles.service";
import { UsersService } from "./modules/users.service";
import { ProductsService } from "./modules/products.service";
import { CategoriesService } from "./modules/categories.service";
import { GoodsService } from "./modules/goods.service";

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
    private goodsService: GoodsService
  ) {}

  users = () => this.usersService;
  auth = () => this.authService;
  roles = () => this.rolesService;
  products = () => this.productsService;
  categories = () => this.categoriesService;
  goods = () => this.goodsService;
}
