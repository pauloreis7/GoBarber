import IStorageProvider from '../models/IStorageProvider'

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  };

  public async deleteFile(file: string): Promise<any> {
    const findIndex = this.storage.findIndex(storagedFile => storagedFile === file)

    this.storage.splice(findIndex, 1);
  };
}

export default FakeStorageProvider;
