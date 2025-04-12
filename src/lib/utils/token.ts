const SECRET_KEY = "minha-chave-secreta"; // idealmente em .env

interface TokenPayload {
  userId: string;
  code: string;
}

function base64Encode(obj: any): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

function base64Decode<T>(str: string): T {
  return JSON.parse(Buffer.from(str, "base64url").toString("utf-8")) as T;
}

function sign(data: string): string {
  let hash = 0;
  const fullString = data + SECRET_KEY;
  for (let i = 0; i < fullString.length; i++) {
    hash = (hash << 5) - hash + fullString.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

export function generateToken(payload: TokenPayload): string {
  const base64Payload = base64Encode(payload);
  const signature = sign(base64Payload);
  return `${base64Payload}.${signature}`;
}

export function extractToken(token: string): TokenPayload | null {
  const [base64Payload, signature] = token.split(".");

  if (!base64Payload || !signature) return null;

  const expectedSignature = sign(base64Payload);
  if (signature !== expectedSignature) {
    console.warn("Assinatura inválida");
    return null;
  }

  return base64Decode<TokenPayload>(base64Payload);
}
