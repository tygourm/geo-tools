import { createConsola } from "consola";

const logger = createConsola({
  level: import.meta.env.PROD ? 2 : 4,
});

export { logger };
