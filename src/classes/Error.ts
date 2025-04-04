interface DatabaseError {
  code?: string;
  message?: string;
  stack?: string;
}

interface AuthenticationError {
  code?: string;
  message?: string;
  name?: string;
}

export class Errors {
    static DBError(e: DatabaseError) {
      return {
        message: "Database Error",
        error: true,
        data: e,
      };
    }
  
    static NotFound(message: string) {
      return {
        message: message,
        error: true,
      };
    }
  
    static Unsuccessful(message: string) {
      return {
        message: message,
        error: true,
      };
    }
  
    static AuthError(e: AuthenticationError) {
      return {
        message: "Authentication Error",
        error: true,
        data: e,
      };
    }
}