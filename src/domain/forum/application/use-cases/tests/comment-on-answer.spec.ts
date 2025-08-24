import { CommentOnAnswerUseCase } from '../comment-on-answer.ts'
import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-repository.ts'
import { InMemoryAnswerCommentsRepository } from 'test/respositories/in-memory-answer-comments-repository.ts'
import { makeAnswer } from 'test/factories/make-answer.ts'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on a answer', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    const { answerComment } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: '1',
      content: 'Nova pergunta',
    })

    expect(answerComment.id).toBeTruthy()
    expect(inMemoryAnswerCommentsRepository.items[0]?.id).toEqual(
      answerComment.id,
    )
  })
})
