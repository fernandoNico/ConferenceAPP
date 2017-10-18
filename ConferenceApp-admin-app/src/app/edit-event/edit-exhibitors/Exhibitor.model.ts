export class Exhibitor {
  name: string;
  description: string;
  email: string;
  exhibitorRepName: string;
  exhibitorIndustry: string;
  exhibitorEvent: string;

constructor(name: string, description: string, email: string, exhibitorRepName: string, exhibitorIndustry: string, exhibitorEvent  ) {
  this.name = name;
  this.description = description;
  this.email =  email;
  this.exhibitorRepName = exhibitorRepName;
  this.exhibitorIndustry = exhibitorIndustry;
  this.exhibitorEvent = exhibitorEvent;
  }

}
