"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let updateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(fakeHashProvider, fakeUsersRepository);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Lorem Doe',
      email: 'loremdoe@example.com'
    });
    expect(updatedUser.name).toBe('Lorem Doe');
    expect(updatedUser.email).toBe('loremdoe@example.com');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non-existing-user',
      name: 'Lorem Doe',
      email: 'loremdoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '1234567'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Test',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Lorem Doe',
      email: 'loremdoe@example.com',
      password: '123123',
      old_password: '1234567'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Lorem Doe',
      email: 'loremdoe@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Lorem Doe',
      email: 'loremdoe@example.com',
      password: '123123',
      old_password: 'wrong-old-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});