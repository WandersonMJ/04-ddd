import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import {
  Notification,
  type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification.ts'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const question = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return question
}
