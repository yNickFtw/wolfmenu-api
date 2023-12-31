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
//@ImportInjection

// @Imports Routes
import UserRouter from '../../modules/user/router/user.router'
import UnitRouter from '../../modules/unit/router/unit.router'
import PlanRouter from '../../modules/plan/router/plan.router'
import StripeRouter from '../../modules/stripe/router/stripe.router'
import CategoryRouter from '../../modules/category/router/category.router'
import ProductRouter from '../../modules/product/router/product.router'
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
