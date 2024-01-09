import { Router } from "express";
import { IRouter } from "../interfaces/globals/IRouter";
import { container } from "tsyringe";
import UserRouter from "../../modules/user/router/user.router";
import UnitRouter from "../../modules/unit/router/unit.router";
import PlanRouter from "../../modules/plan/router/plan.router";
import StripeRouter from "../../modules/stripe/router/stripe.router";
import CategoryRouter from "../../modules/category/router/category.router";
import ProductRouter from "../../modules/product/router/product.router";
import ProductsVariationsRouter from "../../modules/products-variations/router/products-variations.router";
import MenuRouter from "../../modules/menu/router/menu.router";
import MenuItemRouter from "../../modules/menu-item/router/menu-item.router";
//@ImportRouter

export default class MainRouter implements IRouter {
    router: Router;

    constructor(
        private userRouter = container.resolve<IRouter>(UserRouter),
        private unitRouter = container.resolve<IRouter>(UnitRouter),
        private planRouter = container.resolve<IRouter>(PlanRouter),
        private stripeRouter = container.resolve<IRouter>(StripeRouter),
        private categoryRouter = container.resolve<IRouter>(CategoryRouter),
        private productRouter = container.resolve<IRouter>(ProductRouter),
        private productsVariationsRouter = container.resolve<IRouter>(ProductsVariationsRouter),
        private menuRouter = container.resolve<IRouter>(MenuRouter),
        private menuItemRouter = container.resolve<IRouter>(MenuItemRouter),
        //@InstanceRouter

    ) {
        this.router = Router();
        this.router.use('/users', this.userRouter.init());
        this.router.use('/unities', this.unitRouter.init());
        this.router.use('/plans', this.planRouter.init());
        this.router.use('/stripe', this.stripeRouter.init());
        this.router.use('/categories', this.categoryRouter.init());
        this.router.use('/products', this.productRouter.init());
        this.router.use('/products/variations', this.productsVariationsRouter.init());
        this.router.use('/menu', this.menuRouter.init());
        this.router.use('/menu-items', this.menuItemRouter.init());
        //@NewInitInstance
    }

    public init(): Router {
        return this.router;
    }
}
