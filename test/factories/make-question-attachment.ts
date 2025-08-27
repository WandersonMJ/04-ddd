import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import {
  QuestionAttachment,
  type QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment.ts'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
