declare module "karmabridge-types" {
    interface CATEGORY {
        id: string;
        title: string;
        jobs: [JOB] | null;
    }
    interface LOCATION {
        id: number;
        state: string;
        city: string;
        suburb: string;
        street: string;
        country: string;
        PostCode: string;
    }
    interface AUTHOR {
        id: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        verified: boolean;
        password: string;
        imageUrl?: string;
    }
    interface JOB {
        refId: string;
        title: string;
        shortDescription: string;
        longDescription: string;
        categoryId: number;
        category: CATEGORY;
        locations: LOCATION[];
        author: AUTHOR;
        createdAt: Date;
    }
    interface POST {
        id: number;
        title: string;
        subtitle: string;
        content: string;
        authorId: number;
        createdAt: Date;
        published: Boolean;
    }
    interface JOBS_RESPONSE {
        jobs: JOB[];
        totalRows: number;
    }
    interface REGISTRATION_RESPONSE {
        jobs: JOB[];
        totalRows: number;
    }
    interface UserInfo {
        imageUrl?: string;
        FirstName: string;
        LastName: string;
        Email: string;
    }
    interface AuthInfo {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }
    interface ErrorResponse {
        message: string;
        code: number;
    }
    interface RegistrationResponse {
        success: boolean;
        code: number;
        error: ErrorResponse;
        data: AUTHOR;
    }
}
