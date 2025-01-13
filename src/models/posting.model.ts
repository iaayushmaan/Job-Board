import { RowDataPacket } from "mysql2";

export default interface Posting extends RowDataPacket {
  id?: number;
  title?: string;
  company?: string;
  location?: string;
  salary?: number;
  description?: string;
}
