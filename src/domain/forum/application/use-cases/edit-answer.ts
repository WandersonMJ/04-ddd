import { left, right, type Either } from '@/core/either.ts'
import type { Answer } from '../../enterprise/entities/answer.ts'
import type { AnswersRepository } from '../repositories/answers-repository.ts'
import { NotAllowedError } from './errors/not-allowed-error.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
