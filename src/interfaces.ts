export type frameworkType = 'expressjs' | 'nextjs';
export type EngineType = 'mysql' | 'postgres' | 'mssql' | 'sqlite';
export type PatternType = 'DDD' | 'repository';



export interface QuestionOptionsInterface {
  host: string;
  db_name: string;
  db_port: number;
  user: string;
  password: string;
  engine: string | EngineType;
  framework: string;
  pattern: string | PatternType;
  next_crud?: boolean;
}
