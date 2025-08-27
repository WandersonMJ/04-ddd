import type { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answers-attachments-repository.ts'
import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.ts'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(AnswerId: string) {
    const AnswerComents = this.items.filter(
      (item) => item.answerId.toString() === AnswerId,
    )

    return AnswerComents
  }

  async deleteManyByAnswerId(AnswerId: string) {
    const AnswerComents = this.items.filter(
      (item) => item.answerId.toString() !== AnswerId,
    )

    this.items = AnswerComents
  }
}
