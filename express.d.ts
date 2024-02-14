declare namespace Express {
    interface Request {
        query: {
            [key: string]: string | undefined;
        };
    }
}