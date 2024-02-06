import { Column, Entity } from "typeorm";
import { BaseColumns } from "utils/base";


@Entity()
export class Upload extends BaseColumns{
 
  @Column()
  name: string

  @Column()
  url: string

}
