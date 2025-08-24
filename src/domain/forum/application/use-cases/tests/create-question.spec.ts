import { CreateQuestionUseCase } from '../create-question.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Nova pergunta',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(
        result.value?.question.id,
      )
    }
  })
})
