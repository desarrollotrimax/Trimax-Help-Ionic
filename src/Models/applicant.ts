export class Applicant {
  firstName: string ='';
  lastName: string ='';
  telephone: string ='';

  setAll(value:string):void{
    this.firstName = value;
    this.lastName = value;
    this.telephone = value;
  }
}
