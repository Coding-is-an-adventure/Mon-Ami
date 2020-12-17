export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
   time?: Date
}

export class ActivityFormModel implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(initialise?: IActivityFormValues) {
    if (initialise && initialise.date) {
      initialise.time = initialise.date
    }
    Object.assign(this, initialise);
  }
}