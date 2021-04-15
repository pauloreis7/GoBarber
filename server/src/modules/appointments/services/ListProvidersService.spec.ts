import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Lorem Doe',
      email: 'loremdoe@example.com',
      password: '1234567'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Paulo reis',
      email: 'pauloreis@example.com',
      password: '1234567'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual([
      user1,
      user2
    ])
  })
})