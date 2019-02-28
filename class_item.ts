//
// typescript code for a simple storage system
// simple object to store phrases
//

export class Item {

  private id = undefined;
  private phrase = undefined;

  constructor(id:number, phrase:string) {
    this.id = id;
    this.phrase = phrase;
  }

  public get_id(): number {
    return this.id;
  }

  public get_phrase(): string {
    return this.phrase;
  }

}
