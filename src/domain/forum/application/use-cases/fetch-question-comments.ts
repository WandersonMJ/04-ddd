import { left, right, type Either } from '@/core/either.ts'
import type { QuestionComment } from '../../enterprise/entities/question-comment.ts'
import type { QuestionCommentsRepository } from '../repositories/questions-comments-repository.ts'
import type { QuestionsRepository } from '../repositories/questions-repository.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionsCommentsUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
