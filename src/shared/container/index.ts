import { container } from 'tsyringe'
import { IRouter } from '../interfaces/globals/IRouter';
// @Imports
import { IUserRepository } from '../interfaces/modules/user/repository/IUserRepository'
import UserRepository from '../../modules/user/repository/user.repository'
import { IUnitRepository } from '../interfaces/modules/unit/repository/IUnitRepository'
import UnitRepository from '../../modules/unit/repository/unit.repository'
//@ImportInjection

// @Imports Routes
import UserRouter from '../../modules/user/router/user.router'
import UnitRouter from '../../modules/unit/router/unit.router'
//@ImportRouter


import JWTService from '../services/JWTService/JWTService';
import { IJWTService } from '../services/JWTService/IJWTService';
import SMTPService from '../services/SMTPService/SMTPService';
import { ISMTPService } from '../services/SMTPService/ISMTPService'
import FirebaseService from '../services/FirebaseService/FirebaseService';
import { IFirebaseService } from '../services/FirebaseService/IFirebaseService'
import BCryptService from '../services/BCryptService/BCryptService';
import { IBCryptService } from '../services/BCryptService/IBCryptService'
import UserService from '../services/UserService/UserService';
import { IUserService } from '../services/UserService/IUserService'
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

container.register<IUserService>(
  "UserService",
  UserService
)

//@NewService
