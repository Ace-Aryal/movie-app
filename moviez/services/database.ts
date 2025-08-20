import { Movie } from "@/app/(tabs)/search";
import { Client, Account, Databases, Query, ID } from "appwrite";
export const appwriteConfig = {
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  collectionId: process.env.EXPO_PUBLIC_METRICS_COLLECTION_ID!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};
class Database {
  client;
  account;
  databases;
  constructor() {
    this.client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your endpoint
      .setProject(appwriteConfig.projectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }
  updateSearchCount = async (query: string, movie: Movie) => {
    try {
      const searchAlreadyExists = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.equal("title", movie.title)]
      );
      if (searchAlreadyExists.total > 0) {
        const updateRes = await this.databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          searchAlreadyExists.documents[0].$id,
          {
            count: searchAlreadyExists.documents[0].count + 1,
          }
        );
        console.log(updateRes, "update res");
        if (!updateRes) {
          throw new Error("Failed to update search count");
        }
      } else {
        const createRes = await this.databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          ID.unique(),
          {
            search_term: query,
            movie_id: String(movie.id),
            title: movie.title,
            count: 1,
            poster_url: movie.poster_path,
          }
        );
        console.log(createRes, "create res");
        if (!createRes) {
          throw new Error("Failed to create search count");
        }
      }
    } catch (error) {
      console.error(error, "error in update search count");
    }
  };
  getTrendingMovies = async () => {
    try {
      const res = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [Query.orderDesc("count"), Query.limit(10)]
      );
      return res.documents;
    } catch (error) {
      console.error(error, "error in get trending movies");
    }
  };
}
const databaseService = new Database();
export default databaseService;
