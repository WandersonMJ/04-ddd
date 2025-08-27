import { WatchedList } from '@/core/entities/watched-list.ts'
import type { AnswerAttachment } from './answer-attachment.ts'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
