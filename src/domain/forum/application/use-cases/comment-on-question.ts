import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import type { QuestionsRepository } from '../repositories/questions-repository.ts'
import { QuestionComment } from '../../enterprise/entities/question-comment.ts'
import type { QuestionCommentsRepository } from '../repositories/questions-comments-repository.ts'
import { left, right, type Either } from '@/core/either.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
