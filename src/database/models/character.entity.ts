/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Books } from './book.entity';

@Entity()
export class Characters {
  @PrimaryGeneratedColumn()
  character_id: number;
  @Column({ type: 'varchar', name: 'character_name', unique:true })
  character_name: string;
  @Column({type:'varchar', name:'character_gender'})
  character_gender: string;
  @Column({type:'bigint', name:'age', nullable: true})
  age:number
  @Column({type:'varchar', name:'character_dob'})
  character_dob: string;
  @Column({type:'varchar', name:'character_dod'})
  character_dod: string;
  @ManyToOne(()=>Books, (book)=>book.characters)
  book: Books
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
