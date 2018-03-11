import { Document, Schema, Model, model} from 'mongoose';
import { IEvent } from '../interfaces/event';

export const EventSchema: Schema = new Schema({
    title: String,
    start:Date,
    end:Date
  });

  export const EventModel: Model<IEvent> = model<IEvent>("Event", EventSchema);