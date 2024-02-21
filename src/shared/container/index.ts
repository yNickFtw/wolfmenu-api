import { container } from 'tsyringe'
import { IRouter } from '../interfaces/globals/IRouter';
// @Imports
import { IUserRepository } from '../interfaces/modules/user/repository/IUserRepository'
import UserRepository from '../../modules/user/repository/user.repository'
import { IUnitRepository } from '../interfaces/modules/unit/repository/IUnitRepository'
import UnitRepository from '../../modules/unit/repository/unit.repository'
import { IPlanRepository } from '../interfaces/modules/plan/repository/IPlanRepository'
import PlanRepository from '../../modules/plan/repository/plan.repository'
import { IStripeRepository } from '../interfaces/modules/stripe/repository/IStripeRepository'
import StripeRepository from '../../modules/stripe/repository/stripe.repository'
import { ICategoryRepository } from '../interfaces/modules/category/repository/ICategoryRepository'
import CategoryRepository from '../../modules/category/repository/category.repository'
import { IProductRepository } from '../interfaces/modules/product/repository/IProductRepository'
import ProductRepository from '../../modules/product/repository/product.repository'
import { IProductsVariationsRepository } from '../interfaces/modules/products-variations/repository/IProductsVariationsRepository'
import ProductsVariationsRepository from '../../modules/products-variations/repository/products-variations.repository'
import { IMenuRepository } from '../interfaces/modules/menu/repository/IMenuRepository'
import MenuRepository from '../../modules/menu/repository/menu.repository'
import { IMenuCategoryRepository } from '../interfaces/modules/menu-category/repository/IMenuCategoryRepository'
import MenuCategoryRepository from '../../modules/menu-category/repository/menu-category.repository'
import { IMenuProductRepository } from '../interfaces/modules/menu-product/repository/IMenuProductRepository'
import MenuProductRepository from '../../modules/menu-product/repository/menu-product.repository'
import { ILinkRepository } from '../interfaces/modules/link/repository/ILinkRepository'
import LinkRepository from '../../modules/link/repository/link.repository'
import { IViewLinkRepository } from '../interfaces/modules/view-link/repository/IViewLinkRepository'
import ViewLinkRepository from '../../modules/view-link/repository/view-link.repository'
//@ImportInjection

// @Imports Routes
import UserRouter from '../../modules/user/router/user.router'
import UnitRouter from '../../modules/unit/router/unit.router'
import PlanRouter from '../../modules/plan/router/plan.router'
import StripeRouter from '../../modules/stripe/router/stripe.router'
import CategoryRouter from '../../modules/category/router/category.router'
import ProductRouter from '../../modules/product/router/product.router'
import ProductsVariationsRouter from '../../modules/products-variations/router/products-variations.router'
import MenuRouter from '../../modules/menu/router/menu.router'
import MenuCategoryRouter from '../../modules/menu-category/router/menu-category.router'
import MenuProductRouter from '../../modules/menu-product/router/menu-product.router'
import LinkRouter from '../../modules/link/router/link.router'
import ViewLinkRouter from '../../modules/view-link/router/view-link.router'
//@ImportRouter

import JWTService from '../services/JWTService/JWTService';
import { IJWTService } from '../services/JWTService/IJWTService';
import SMTPService from '../services/SMTPService/SMTPService';
import { ISMTPService } from '../services/SMTPService/ISMTPService'
import FirebaseService from '../services/FirebaseService/FirebaseService';
import { IFirebaseService } from '../services/FirebaseService/IFirebaseService'
import BCryptService from '../services/BCryptService/BCryptService';
import { IBCryptService } from '../services/BCryptService/IBCryptService'
//@ImportService

// @Repositories

container.register<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.register<IUnitRepository>(
  "UnitRepository",
  UnitRepository
)

container.register<IPlanRepository>(
  "PlanRepository",
  PlanRepository
)

container.register<IStripeRepository>(
  "StripeRepository",
  StripeRepository
)

container.register<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
)

container.register<IProductRepository>(
  "ProductRepository",
  ProductRepository
)

container.register<IProductsVariationsRepository>(
  "ProductsVariationsRepository",
  ProductsVariationsRepository
)

container.register<IMenuRepository>(
"MenuRepository",
MenuRepository
)

container.register<IMenuCategoryRepository>(
"MenuCategoryRepository",
MenuCategoryRepository
)

container.register<IMenuProductRepository>(
"MenuProductRepository",
MenuProductRepository
)

container.register<ILinkRepository>(
"LinkRepository",
LinkRepository
)

container.register<IViewLinkRepository>(
"ViewLinkRepository",
ViewLinkRepository
)
//@InjectionDependecy

// @Routers

container.register<IRouter>(
  "UserRouter",
  UserRouter
)

container.register<IRouter>(
  "UnitRouter",
  UnitRouter
)

container.register<IRouter>(
  "PlanRouter",
  PlanRouter
)

container.register<IRouter>(
  "StripeRouter",
  StripeRouter
)

container.register<IRouter>(
  "CategoryRouter",
  CategoryRouter
)

container.register<IRouter>(
  "ProductRouter",
  ProductRouter
)

container.register<IRouter>(
  "ProductsVariationsRouter",
  ProductsVariationsRouter
)

container.register<IRouter>(
  "MenuRouter",
  MenuRouter
)

container.register<IRouter>(
  "MenuCategoryRouter",
  MenuCategoryRouter
)

container.register<IRouter>(
  "MenuProductRouter",
  MenuProductRouter
)

container.register<IRouter>(
  "LinkRouter",
  LinkRouter
)

container.register<IRouter>(
  "ViewLinkRouter",
  ViewLinkRouter
)
//@RouterInjection

// @Services
container.register<IJWTService>(
  "JWTService",
  JWTService
)

container.register<ISMTPService>(
  "SMTPService",
  SMTPService
)

container.register<IFirebaseService>(
  "FirebaseService",
  FirebaseService
)

container.register<IBCryptService>(
  "BCryptService",
  BCryptService
)

//@NewService
