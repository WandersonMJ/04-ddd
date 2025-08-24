import { AnswerQuestionUseCase } from '../answer-question.ts'
import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-repository.ts'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer a Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      content: 'Resposta da pergunta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.value?.answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(
      result.value?.answer.id,
    )
  })
})
