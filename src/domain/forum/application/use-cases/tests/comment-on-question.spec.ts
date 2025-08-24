import { CommentOnQuestionUseCase } from '../comment-on-question.ts'
import { InMemoryQuestionsRepository } from 'test/respositories/in-memory-questions-repository.ts'
import { InMemoryQuestionCommentsRepository } from 'test/respositories/in-memory-question-comments-repository.ts'
import { makeQuestion } from 'test/factories/make-question.ts'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
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

    const { questionComment } = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: '1',
      content: 'Nova pergunta',
    })

    expect(questionComment.id).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items[0]?.id).toEqual(
      questionComment.id,
    )
  })
})
