import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import type { AnswersRepository } from '../repositories/answers-repository.ts'
import type { AnswerCommentsRepository } from '../repositories/answers-comments-repository.ts'
import { AnswerComment } from '../../enterprise/entities/answer-comment.ts'
import { left, right, type Either } from '@/core/either.ts'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error.ts'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
