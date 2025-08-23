import type { Question } from '../../enterprise/entities/question.ts'

export interface QuestionsRepository {
  getBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
