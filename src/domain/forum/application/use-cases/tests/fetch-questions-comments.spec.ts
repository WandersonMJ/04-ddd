import { InMemoryQuestionCommentsRepository } from 'test/respositories/in-memory-question-comments-repository.ts'
import { FetchQuestionsCommentsUseCase } from '../fetch-question-comments.ts'
import { makeQuestionComment } from 'test/factories/make-question-comment.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { makeQuestion } from 'test/factories/make-question.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionsCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionsCommentsUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to fetch question comments', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questionComments).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated question comments', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: question.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.questionComments).toHaveLength(2)
    }
  })
})
