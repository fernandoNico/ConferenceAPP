export class SubEvent {
    subEventId: number;
    subEventTitle: string;
    subEventStartDate: string;
    subEventEndDate: string;
    subEventDescription: string;
    ParentEventId: number;
    


    constructor(    subEventTitle: string, subEventStartDate: string, subEventEndDate: string, 
                    subEventDescription: string, ParentEventId: number ){
      
            this.subEventTitle =     subEventTitle;  
            this.subEventStartDate =  subEventStartDate;
            this.subEventEndDate =   subEventEndDate;
            this.subEventDescription = subEventDescription;
            this.ParentEventId =  ParentEventId;
           
    }
}