import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "postgres",
  host: "host.docker.internal",
  port: 5412,
  username: "postgres",
  password: "samplePassword",
  database: "learn_databases",
  migrationsTableName: "migrations",
  migrationsRun: false,
  logging: true,
  synchronize: false,
  entities: ["**/*.entity.{ts,js}"],
  migrations: ["**/migrations/*.{ts,js}"],
});

class AppDataSource {
  private static dataSource: DataSource = connectionSource;

  public static async connection(): Promise<DataSource> {
    if (this.dataSource.isInitialized === false) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }

  public static async closeConnections(): Promise<void> {
    return this.dataSource.destroy();
  }
}

export default AppDataSource;
