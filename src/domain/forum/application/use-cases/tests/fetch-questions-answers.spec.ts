import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-repository.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { FetchQuestionsAnswersUseCase } from '../fetch-question-answers.ts'
import { makeAnswer } from 'test/factories/make-answer.ts'
import { makeQuestion } from 'test/factories/make-question.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionsAnswersUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
      }),
    )

    const result = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated recent questions', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
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
      expect(result.value.answers).toHaveLength(2)
    }
  })
})
