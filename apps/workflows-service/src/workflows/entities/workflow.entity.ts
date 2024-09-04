import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  buildingId: string;
}
