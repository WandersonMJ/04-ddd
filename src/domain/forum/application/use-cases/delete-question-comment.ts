import type { QuestionCommentsRepository } from '../repositories/questions-comments-repository.ts'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment does not exists')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('user not authorized')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
