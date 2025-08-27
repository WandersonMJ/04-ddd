import { CommentOnQuestionUseCase } from '../comment-on-question.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { InMemoryQuestionCommentsRepository } from 'test/respositories/in-memory-question-comments-repository.ts'
import { makeQuestion } from 'test/factories/make-question.ts'
import { InMemoryQuestionAttachmentsRepository } from 'test/respositories/in-memory-question-attachments-repository.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on a question', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: '1',
      content: 'Nova pergunta',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryQuestionCommentsRepository.items[0]?.id).toEqual(
        result.value?.questionComment.id,
      )
    }
  })
})
