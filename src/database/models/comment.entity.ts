/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './book.entity';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    comment_id: number
    @Column({ type: 'varchar', name: "author_ip" })
    author_ip: string
    @Column({ type: 'text', name: "comment"})
    comment: string
    @ManyToOne(()=>Books, (book)=>book.comments)
    book: Books
    @CreateDateColumn()
    posted_on: Date
}
