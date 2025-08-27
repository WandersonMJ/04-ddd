import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import { CreateQuestionUseCase } from '../create-question.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { InMemoryQuestionAttachmentsRepository } from 'test/respositories/in-memory-question-attachments-repository.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Nova pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryQuestionsRepository.items[0]).toEqual(
        result.value?.question,
      )

      expect(
        inMemoryQuestionsRepository.items[0]?.attachments.currentItems,
      ).toHaveLength(2)
      expect(
        inMemoryQuestionsRepository.items[0]?.attachments.currentItems,
      ).toEqual([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ])
    }
  })
})
