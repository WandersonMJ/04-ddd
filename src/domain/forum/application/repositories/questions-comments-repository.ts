import type { PaginationParams } from '@/core/repositories/pagination-params.ts'
import type { QuestionComment } from '../../enterprise/entities/question-comment.ts'

export interface QuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
}
