/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Books } from 'src/database/models/book.entity';
import { Characters } from 'src/database/models/character.entity';
import { Comments } from 'src/database/models/comment.entity';
import { json } from 'stream/consumers';
import { QueryBuilder, Repository } from 'typeorm';
import { CharactersQueryParams } from './dtos/characters-query-params.dto';

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
      return {
        message: 'success',
        books: collection
      }
    } catch (error) {
      console.error("Something Happened fetching Books: ", error)
      return {
        status: 404,
        message: "We couldn't get you the resources you were looking for"
      }

    }
  }
  async fetchBookCharacterList(params: CharactersQueryParams, bookID) {
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
      console.log(params)
      // Query
      let bookCharacters
      if (
        (params.order != undefined && params.order != '') &&
        (params.sortBy != undefined && params.sortBy != '' &&
          params.filterByGender == undefined || '')
      ) {
        const sort = params.order == 'asc' ? "ASC" : "DESC"
        bookCharacters = await this.books.createQueryBuilder('books')
          .leftJoinAndSelect('books.characters', 'characters')
          .orderBy(`characters.${params.sortBy}`, `${sort}`)
          .where('books.book_id = :book_id', { book_id: bookID })
          .getMany()
        console.log('Fetching Sorted List')
        console.log("Sorted LIST", bookCharacters)
        const charactersCount = bookCharacters[0].characters.length
        const filteredLst = bookCharacters[0].characters
        let tage = 0;
        filteredLst.forEach((list) => {
          tage += parseInt(list.age)
        });
        console.log("Total Age: ", tage)
        return {
          message: 'success',
          charactersCount: charactersCount,
          totalAge: tage,
          ...bookCharacters[0]
        }
      }
      if (
        (params.order == undefined || params.order == '') &&
        (params.sortBy == undefined || params.sortBy == '') &&
        (params.filterByGender != undefined && params.filterByGender != '') &&
        (params.filterByGender == "male" || params.filterByGender == "female")) {
        const gender = params.filterByGender == "female" ? "Female" : "Male"
        bookCharacters = await this.books.createQueryBuilder('books')
          .leftJoinAndSelect('books.characters', 'characters')
          .where('books.book_id = :book_id', { book_id: bookID })
          .andWhere('characters.character_gender = :character_gender', { character_gender: gender })
          .getMany()
        console.log('Fetching Sorted List')
        console.log("Gender filtered LIST", bookCharacters)
        if (bookCharacters.length < 1) {
          return {
            message: 'success',
            charactersCount: 0
          }

        }
        const charactersCount = bookCharacters[0].characters.length
        const filteredList = bookCharacters[0].characters

        let totalAge = 0;
        filteredList.forEach((list) => {
          totalAge += parseInt(list.age)
        });
        console.log("Total Age: ", totalAge)

        return {
          message: 'success',
          charactersCount,
          totalAge,
          ...bookCharacters[0]
        }
      }
      // sort and filter
      if (
        (params.order != undefined || params.order != '') &&
        (params.sortBy != undefined || params.sortBy != '') &&
        (params.filterByGender != undefined && params.filterByGender != '')
      ) {
        console.log('Sorting and Filtering....')
        const gender = params.filterByGender == "female" ? "Female" : "Male"
        const sort = params.order == 'asc' ? "ASC" : "DESC"
        bookCharacters = await this.books.createQueryBuilder('books')
          .leftJoinAndSelect('books.characters', 'characters')
          .orderBy(`characters.${params.sortBy}`, `${sort}`)
          .where('books.book_id = :book_id', { book_id: bookID })
          .andWhere('characters.character_gender = :character_gender', { character_gender: gender })
          .getMany()
        console.log('Fetching Sorted List')
        console.log("Sorted LIST", bookCharacters)
        const charactersCount = bookCharacters[0].characters.length
        const filteredLst = bookCharacters[0].characters
        let tage = 0;
        filteredLst.forEach((list) => {
          tage += parseInt(list.age)
        });
        console.log("Total Age: ", tage)
        return {
          message: 'success',
          charactersCount: charactersCount,
          totalAge: tage,
          ...bookCharacters[0]
        }
      }

      // end sort and filter
      bookCharacters = await this.books.findOne({
        where: {
          book_id: bookID,
        },
        relations: ["characters",]
      })
      if (bookCharacters.characters.length > 1) {
        let sumOAge = 0
        bookCharacters.characters.forEach((element) => {
          sumOAge += parseInt(element.age)
        });
        return {
          bookId: bookCharacters.book_id,
          charactersCount: bookCharacters.characters.length,
          totalAge: sumOAge,
          characters: bookCharacters.characters
        }
      } else {
        for (let i = 0; i < charactersLength; i++) {
          const uri = bookData.characters[i]
          const characterInfo = await lastValueFrom(
            this.httpService.get(uri).pipe(map((result) => result.data))
          )
          if ((characterInfo.name != "" && characterInfo.gender != "") && (characterInfo.born != "" && characterInfo.died != "")) {
            const characterData = {
              book: bookID,
              name: characterInfo.name,
              gender: characterInfo.gender,
              born: characterInfo.born,
              died: characterInfo.died,
              age: ((characterInfo.died).match(/^\d+|\d+\b|\d+(?=\w)/g))[0] - ((characterInfo.born).match(/^\d+|\d+\b|\d+(?=\w)/g))[0]
            }
            const characterModel = this.characters.create({
              character_name: characterData.name,
              character_gender: characterData.gender,
              age: characterData.age,
              character_dob: characterData.born,
              character_dod: characterData.died,
              book: characterData.book
            })
            await this.characters.upsert(characterModel, {
              skipUpdateIfNoValuesChanged: true,
              conflictPaths: ['character_name']
            })
          }
        }
        const books = await this.books.findOne({
          where: {
            book_id: bookID,
          },
          relations: ["characters"]
        })

        const filteredList = bookCharacters[0].characters

        let totalAge = 0;
        filteredList.forEach((list) => {
          totalAge += parseInt(list.age)
        });
        console.log("Total Age: ", totalAge)

        return {
          message: 'success',
          charactersCount: filteredList.length,
          totalAge,
          ...books[0]
        }


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
    try {
      const commentData = {
        author_ip: req.ip,
        comment: comment.comment,
        book: bookID
      }
      await this.coments.save(commentData)
      return {
        message: 'success',
        bookID,
        comment: comment.comment
      }
    } catch (error) {
      return {
        status: 400,
        message: "Could not add comment to the book",
        error: error.message
      }


    }
  }
}
