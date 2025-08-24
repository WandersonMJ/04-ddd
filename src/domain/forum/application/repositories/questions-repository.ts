import type { PaginationParams } from '@/core/repositories/pagination-params.ts'
import type { Question } from '../../enterprise/entities/question.ts'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  getBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
