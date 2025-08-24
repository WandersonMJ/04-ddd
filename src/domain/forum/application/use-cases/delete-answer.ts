import type { AnswersRepository } from '../repositories/answers-repository.ts'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private AnswerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.AnswerRepository.findById(answerId)

    if (!Answer) {
      throw new Error('Answer does not exists')
    }

    if (authorId !== Answer.authorId.toString()) {
      throw new Error('user not authorized')
    }

    await this.AnswerRepository.delete(Answer)

    return {}
  }
}
