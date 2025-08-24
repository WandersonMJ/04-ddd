import { InMemoryAnswerCommentsRepository } from 'test/respositories/in-memory-answer-comments-repository.ts'
import { FetchAnswerCommentsUseCase } from '../fetch-answers-comments.ts'
import { makeAnswerComment } from 'test/factories/make-answer-comment.ts'
import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-repository.ts'
import { makeAnswer } from 'test/factories/make-answer.ts'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to fetch question comments', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.answerComments).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated question comments', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: answer.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: answer.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.answerComments).toHaveLength(2)
    }
  })
})
