import { create } from "zustand";
import { toast } from "sonner";
import { apolloClient } from "../config/apollo-client.config";
import { SIGN_IN } from "../api/mutations/sign-in";
import { GET_CURRENT_USER } from "../api/queries/get-current-user";
import Cookies from "js-cookie";
import { User } from "@/src/graphql/graphql";

type SignInPayload = {
  email: string;
  normalizedPassword: string;
};

interface AuthStore {
  user?: User;
  token?: string;
  isLoggingIn?: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setIsLoggingIn: (isLoggingIn: boolean) => Promise<void>;
  refreshUser: () => void;
  signIn: (signInPayload: SignInPayload) => Promise<void>;
  signOut: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuth = create<AuthStore>((set, get) => ({
  signIn: async ({ email, normalizedPassword }) => {
    set({ isLoggingIn: true });
    apolloClient
      .mutate({
        mutation: SIGN_IN,
        variables: {
          signInInput: {
            email,
            normalizedPassword,
          },
        },
      })
      .then(({ data }) => {
        toast.success("Login realizado com sucesso!");

        set({ isLoggingIn: false });

        if (!data?.signIn) return;

        const { accessToken, user } = data.signIn;

        Cookies.set("auth_token", accessToken, { expires: 7 });

        Cookies.set("auth_user", JSON.stringify(user), { expires: 7 });

        set({ user, token: accessToken });
      })
      .catch(() => {
        set({ isLoggingIn: false });
        toast.error("Erro ao realizar o login! Tente novamente.");
      });
  },

  setToken: (token) => {
    if (token) {
      Cookies.set("auth_token", token, { expires: 7 });
    } else {
      Cookies.remove("auth_token");
    }
    set({ token });
  },

  setUser: (user) => {
    if (user) {
      Cookies.set("auth_user", JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove("auth_user");
    }
    set({ user });
  },

  setIsLoggingIn: async (isLoggingIn) => {
    await set({ isLoggingIn });
  },

  refreshUser: async () => {
    const token = Cookies.get("auth_token");

    if (!token) {
      if (typeof window !== "undefined") {
        toast.error("Token não encontrado. Faça login novamente.");
      }
      return;
    }

    try {
      const { data } = await apolloClient.query({
        query: GET_CURRENT_USER,
        fetchPolicy: "no-cache",
      });

      if (!data?.getCurrentUser) {
        return;
      }

      const user = data.getCurrentUser;
      Cookies.set("auth_user", JSON.stringify(user), { expires: 7 });

      set({ user });
    } catch (error) {
      if (typeof window !== "undefined") {
        toast.error("Erro ao atualizar usuário, tente novamente!");
        console.log(error);
      }
    }
  },

  signOut: () => {
    Cookies.remove("auth_token");
    Cookies.remove("auth_user");

    set({
      user: undefined,
      token: undefined,
    });
  },
}));
