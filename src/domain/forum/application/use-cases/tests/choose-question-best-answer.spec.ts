import { ChooseQuestionBestAnswerUseCase } from '../choose-question-best-answer.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-repository.ts'
import { makeQuestion } from 'test/factories/make-question.ts'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import { makeAnswer } from 'test/factories/make-answer.ts'
import { NotAllowedError } from '../errors/not-allowed-error.ts'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose a best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
      questionId: newQuestion.id,
    })

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value?.question.bestAnswerId).toEqual(newAnswer.id)
    }
  })

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
      questionId: newQuestion.id,
    })

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: newAnswer.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
