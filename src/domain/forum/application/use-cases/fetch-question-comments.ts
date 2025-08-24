import type { QuestionComment } from '../../enterprise/entities/question-comment.ts'
import type { QuestionCommentsRepository } from '../repositories/questions-comments-repository.ts'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionsCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
