import { Question } from '@/domain/forum/enterprise/entities/question.ts'
import { GetQuestionBySlugUseCase } from '../get-question-by-slug.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.ts'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example Question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID(),
      content: 'Conteúdo da pergunta',
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
