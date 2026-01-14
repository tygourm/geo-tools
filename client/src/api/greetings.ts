import { useQuery } from "@tanstack/react-query";

import { client } from "@/api/client";

const greetingsApi = {
  useGreetings: () =>
    useQuery({
      queryKey: ["greetings"],
      queryFn: () => client.get<string>("/greetings").then((res) => res.data),
    }),
};

export { greetingsApi };
