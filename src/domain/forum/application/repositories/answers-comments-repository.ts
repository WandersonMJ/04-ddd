import type { PaginationParams } from '@/core/repositories/pagination-params.ts'
import type { AnswerComment } from '../../enterprise/entities/answer-comment.ts'

export interface AnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  delete(answerComment: AnswerComment): Promise<void>
}
