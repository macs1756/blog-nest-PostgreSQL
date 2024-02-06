import { Column, Entity } from "typeorm";
import { BaseColumns } from "utils/base";


@Entity()
export class Archive extends BaseColumns{
 
  @Column()
  name: string

  @Column()
  code: string

}
