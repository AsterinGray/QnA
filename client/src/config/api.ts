export default {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  user: {
    get: "/user",
    update: "/user",
    delete: "/user",
  },
  question: {
    get: "/question",
    create: "/question",
    update: (id: number): string => `/question/${id}`,
    delete: (id: number): string => `/question/${id}`,
    getById: (id: number): string => `/question/${id}`,
    getAnswersByQuestion: (id: number): string => `/question/${id}/answer`,
    addAnswer: (id: number): string => `/question/${id}/answer`,
    like: (id: number): string => `/question/${id}/like`,
    unlike: (id: number): string => `/question/${id}/like`,
  },
  answer: {
    update: (id: number): string => `/answer/${id}`,
    delete: (id: number): string => `/answer/${id}`,
    like: (id: number): string => `/answer/${id}/like`,
    unlike: (id: number): string => `/answer/${id}/like`,
  },
};
