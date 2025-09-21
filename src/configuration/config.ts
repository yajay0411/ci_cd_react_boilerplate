import * as yup from 'yup';

// 1️⃣ Define schema
const envSchema = yup.object({
  NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).required(),
  API_BASE_URL: yup.string().url().required(),
});

// 2️⃣ Validate environment
const parsedEnv = envSchema.validateSync(
  {
    NODE_ENV: import.meta.env.MODE || process.env.NODE_ENV,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  },
  { abortEarly: false, stripUnknown: true },
);

if (['development', 'test'].includes(parsedEnv.NODE_ENV)) {
  // eslint-disable-next-line no-console
  console.table(parsedEnv);
}

// 3️⃣ Freeze config
export const CONFIG = Object.freeze(parsedEnv);
