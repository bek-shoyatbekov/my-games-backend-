import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: 0 })
  globalRank: number;

  @Prop({ default: 0 })
  localRank: number;

  @Prop()
  fcm?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
