import type { Answer } from '@/domain/forum/enterprise/entities/answer.ts'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
