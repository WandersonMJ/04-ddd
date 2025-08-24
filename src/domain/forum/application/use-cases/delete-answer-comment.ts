import type { AnswerCommentsRepository } from '../repositories/answers-comments-repository.ts'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment does not exists')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('user not authorized')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
