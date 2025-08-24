import type { QuestionsRepository } from '../repositories/questions-repository.ts'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('question does not exists')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('user not authorized')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
