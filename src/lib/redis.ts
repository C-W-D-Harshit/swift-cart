import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const CACHE_KEY_PREFIX = "swift-cart:";
export const PRODUCTS_CACHE_KEY = `${CACHE_KEY_PREFIX}products`;
export const PRODUCT_CACHE_KEY = (id: string) => `${CACHE_KEY_PREFIX}product:${id}`;

export default redis;
