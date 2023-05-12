/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    balance: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);