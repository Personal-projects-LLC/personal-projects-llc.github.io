import { db } from '@/libs/DB';

export class BaseRepository {
  protected db = db;
}
