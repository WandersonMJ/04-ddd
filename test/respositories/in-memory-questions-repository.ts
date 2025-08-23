import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository.ts'
import type { Question } from '@/domain/forum/enterprise/entities/question.ts'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async getBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }
}
