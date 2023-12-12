import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Employee } from 'src/modules/employee/entities/employee.entity';

/**
 * 
 * @param timestamp -> set the dates for default from mongo, adding: createdAt and updatedAt
 */
@Schema({ timestamps: true })
export class Beneficiary extends Document {

    @Prop({ type: String, required: true })
    uuid: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    surname: string;

    @Prop({ type: String, required: true })
    birthdate: string;

    @Prop({ type: String, required: true })
    curp: string;

    @Prop({ type: String, required: true })
    ssn: string;

    @Prop({ type: Number, required: true })
    phone: number;

    @Prop({ type: String, required: true })
    nationality: string;

    @Prop({ type: Number, required: true })
    percentage: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Employee' })
    employee: Employee;

    @Prop({ type: Boolean, trim: true, default: true, required: true })
    active: boolean;

    @Prop({ type: String, trim: true, select: false })
    __v: string;
}

export const BeneficiarySchema = SchemaFactory.createForClass( Beneficiary );
BeneficiarySchema.plugin( mongoosePaginate );

/**
 * * Function to don't send the 'password' and '__v' after .save();
 */
BeneficiarySchema.set( 'toJSON', {
    transform: function( doc, ret, opt ) {
        delete ret['__v']
        return ret
    }
})