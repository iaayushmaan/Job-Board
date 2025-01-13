import { OkPacket } from "mysql2";
import connection from "../db";

import Posting from "../models/posting.model";

interface IPostingRepository {
  save(posting: Posting): Promise<Posting>;
  retrieveAll(searchParams: {
    title: string;
    published: boolean;
  }): Promise<Posting[]>;
  retrieveById(postingId: number): Promise<Posting | undefined>;
  update(posting: Posting): Promise<number>;
  delete(postingId: number): Promise<number>;
}

class PostingRepository implements IPostingRepository {
  save(posting: Posting): Promise<Posting> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO postings (title, company, location, salary, description) VALUES(?,?,?,?,?)",
        [
          posting.title,
          posting.company,
          posting.location,
          posting.salary,
          posting.description,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((posting) => resolve(posting!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {
    title?: string;
    company?: string;
    location?: string;
    salary?: number;
  }): Promise<Posting[]> {
    let query: string = "SELECT * FROM postings";
    let conditions: string[] = [];

    if (searchParams?.title)
      conditions.push(
        `LOWER(title) LIKE '%${searchParams.title.toLowerCase()}%'`
      );
    if (searchParams?.company)
      conditions.push(
        `LOWER(company) LIKE '%${searchParams.company.toLowerCase()}%'`
      );
    if (searchParams?.location)
      conditions.push(
        `LOWER(location) LIKE '%${searchParams.location.toLowerCase()}%'`
      );
    if (searchParams?.salary)
      conditions.push(`salary >= ${searchParams.salary}`);

    if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

    return new Promise((resolve, reject) => {
      connection.query<Posting[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(postingId: number): Promise<Posting> {
    return new Promise((resolve, reject) => {
      connection.query<Posting[]>(
        "SELECT * FROM postings WHERE id = ?",
        [postingId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(posting: Posting): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE postings SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?",
        [
          posting.title,
          posting.company,
          posting.location,
          posting.salary,
          posting.description,
          posting.id,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(postingId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM postings WHERE id = ?",
        [postingId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }
}

export default new PostingRepository();
