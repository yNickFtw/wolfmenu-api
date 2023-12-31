require('dotenv').config()
import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateSessionCheckoutUseCase } from "../../../shared/interfaces/modules/stripe/useCases/ICreateSessionCheckoutUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

@injectable()
export default class CreateSessionCheckoutUseCase implements ICreateSessionCheckoutUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, planId: string): Promise<string | null> {
        const decoded = this.JWTService.decodeToken(token, true);

        if(!decoded) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente"
            };

            throw error;
        }

        const { userId } = decoded;

        const user = await this.UserRepository.findById(userId);

        if(!user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente"
            }

            throw error;
        }

        let customerId: string;

        const customers = await stripe.customers.search({
            query: "metadata[ref]: " + user.id
        })

        if(customers.data.length === 0) {
            const customer = await stripe.customers.create({
                name: user.firstName,
                email: user.email,
                phone: user.phone,
                address: {
                    state: user.state,
                    city: user.city,
                    country: "BR",
                    line1: user.address,
                    postal_code: user.zip_code
                },
                metadata: { ref: user.id }
            })

            if(customer && customer.id) {
                customerId = customer.id

                await this.UserRepository.update({ customerId: customerId });
            }
        } else {
            customerId = customers.data[0].id
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId!,
            line_items: [
                {
                    price: planId,
                    quantity: 1
                }
            ],
            mode: "subscription",
            cancel_url: process.env.CLIENT_URL + '/plans',
            success_url: process.env.CLIENT_URL + '/success/thanks'
        })

        return session.url;
    }
}
