import { right, type Either } from '@/core/either.ts'
import { Question } from '../../enterprise/entities/question.ts'
import type { QuestionsRepository } from '../repositories/questions-repository.ts'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}
