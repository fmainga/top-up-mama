/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Characters } from './character.entity';
import { Comments } from './comment.entity';

@Entity()
export class Books {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({type: 'bigint', name:'book_id'})
  book_id: number
  @Column({ type: 'varchar', name: 'book_name', unique: true })
  book_name: string;
  @OneToMany(() => Comments, (comment) => comment.book)
  comments: Comments[]
  @OneToMany(()=>Characters, (character)=>character.book)
  characters: Characters[]
  @Column({type:'date', name: "release_date"})
  release_date: Date
  @Column({type:'simple-json', name: "authors"})
  authors: JSON
  @CreateDateColumn()
  created_at: Date
}
