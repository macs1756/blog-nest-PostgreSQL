import { Column } from "typeorm";
import { BaseColumns } from "utils/base";

export class Upload extends BaseColumns{
 
  @Column()
  name: string

  @Column()
  url: string

}
