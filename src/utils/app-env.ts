type Environment = "development" | "staging" | "production" | "test";

export const getAppEnvironment = (): Environment => import.meta.env.MODE as Environment;

export const isProduction = (): boolean => getAppEnvironment() === "production";
