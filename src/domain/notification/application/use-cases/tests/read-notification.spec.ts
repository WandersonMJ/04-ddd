import { InMemoryNotificationsRepository } from 'test/respositories/in-memory-notifications-repository.ts'
import { ReadNotificationUseCase } from '../read-notification.ts'
import { makeNotification } from 'test/factories/make-notification.ts'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.ts'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error.ts'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to Read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(
        expect.any(Date),
      )
    }
  })

  it('should not be able to read a notification from another user', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniqueEntityID('recipient-1'),
      },
      new UniqueEntityID('Notification-1'),
    )

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      notificationId: 'Notification-1',
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
