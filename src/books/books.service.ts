/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Books } from 'src/database/models/book.entity';
import { Characters } from 'src/database/models/character.entity';
import { Comments } from 'src/database/models/comment.entity';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Comments) private readonly coments: Repository<Comments>,
    @InjectRepository(Books) private readonly books: Repository<Books>,
    @InjectRepository(Characters) private readonly characters: Repository<Characters>
  ) { }
  async fetchAllBooks() {
    const url = `${process.env.RESOURCES_URL}/books`
    try {
      const books = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            "Content-Type": "application/json"
          }
        }).pipe(
          map((result) => result.data)
        )
      )
      const totalBooks = books.length
      console.log("Books Count: ", totalBooks)
      for (let i = 1; i <= totalBooks; i++) {
        const uri = `${url}/${i}`
        const book = await lastValueFrom(
          this.httpService.get(uri, {
            headers: {
              "Content-Type": "application/json"
            }
          }).pipe(
            map((result) => result.data)
          )
        )
        const bkData = {
          id: i,
          name: book.name,
          authors: book.authors,
          released: book.released
        }
        // save book
        const bookModel: Books = this.books.create({
          book_id: bkData.id,
          book_name: bkData.name,
          release_date: bkData.released,
          authors: bkData.authors
        })
        await this.books.upsert(bookModel, {
          skipUpdateIfNoValuesChanged: true,
          conflictPaths: ['book_name']
        })

      }
      const collection = await this.books.createQueryBuilder('books')
        .leftJoinAndSelect('books.comments', 'comments')
        .leftJoinAndSelect('books.characters', 'characters')
        .orderBy("books.book_id", "ASC")
        .orderBy("books.release_date", "ASC")
        .getMany()
      console.log(collection)
      return collection
    } catch (error) {
      console.error("Something Happened fetching Books: ", error)
      return {
        status: 404,
        message: "We couldn't get you the resources you were looking for"
      }

    }
  }
  async fetchBookCharacterList(bookID) {
    const url = `${process.env.RESOURCES_URL}/books/${bookID}`
    try {
      const bookData = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            "Content-Type": "application/json"
          }
        }).pipe(
          map((result) => result.data)
        )
      )
      console.log("Book Characters Count: ", bookData.characters.length)
      const charactersLength = bookData.characters.length
      const bookCharacters = await this.books.findOne({
        where: {
          book_id: bookID,
        },
        relations: ["characters",]
      })
      if(bookCharacters.characters.length>1){
        return {
          bookId: bookCharacters.book_id,
          charactersCount: bookCharacters.characters.length,
          characters: bookCharacters.characters
        }
      } else {
        for(let i =0 ;i<charactersLength;i++){
          const uri = bookData.characters[i]
          const characterInfo = await lastValueFrom(
            this.httpService.get(uri).pipe(map((result)=>result.data))
          )
          if ((characterInfo.name!= "" && characterInfo.gender!= "")&&(characterInfo.born!= "" && characterInfo.died!= "")){
            const characterData = {
              book: bookID,
              name: characterInfo.name,
              gender: characterInfo.gender,
              born: characterInfo.born,
              died: characterInfo.died,
            }
            const characterModel = this.characters.create({
              character_name: characterData.name,
              character_gender: characterData.gender,
              character_dob: characterData.born,
              character_dod: characterData.died,
              book:characterData.book
            })
            await this.characters.upsert(characterModel,{
              skipUpdateIfNoValuesChanged: true,
              conflictPaths: ['character_name']
            })
          }
        }
        return await this.books.findOne({
          where: {
            book_id: bookID,
          },
          relations: ["characters"]
        })

      }

    } catch (error) {
      console.error(error)
      console.error('Something happened fetching book\'s character list')
      return {
        status: 404,
        message: 'We could not fetch associated books\' characters'
      }

    }
  }
  async fetchBooksComments(bookID: number) {
    // const comments = await this.books.createQueryBuilder('books')
    // .leftJoinAndSelect("books.comments", "comments")
    //   .where("book.book_id = :book_id", {
    //     book_id: bookID
    //   })
    //   .getOne()
    const comments = await this.books.findOne({
      where: {
        book_id: bookID,
      },
      relations: ["comments"]
    })
    console.log('Comments:', comments)
    return comments
  }
  async comment({ bookID, req, comment }) {
    const commentData = {
      author_ip: req.ip,
      comment: comment.comment,
      book: bookID
    }
    await this.coments.save(commentData)
    return {
      bookID,
      comment: comment.comment
    }
  }
}
