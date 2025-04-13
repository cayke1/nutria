"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck, ArrowRight, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";

export default function Page() {
  const { requestCode, verifyCode } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    const res = await requestCode(email);
    if (res) {
      setIsLoading(false);
      setIsCodeSent(true);
      toast.success("Código enviado", {
        description: `Um código de verificação foi enviado para ${email}`,
      });
      return;
    }

    setIsLoading(false);
    toast.error("Erro ao enviar o código", {
      description: "Verifique se o email está correto",
    });
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) return;

    setIsLoading(true);

    await verifyCode(email, verificationCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nutria-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-nutria-600 mb-2">Nutria</h1>
          <p className="text-gray-600">
            Seu assistente de alimentação saudável
          </p>
        </div>

        <Card className="shadow-lg border-nutria-100">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isCodeSent ? "Verificar código" : "Entrar"}
            </CardTitle>
            <CardDescription>
              {isCodeSent
                ? "Digite o código de 6 dígitos enviado para seu email"
                : "Use seu email para acessar sua conta"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!isCodeSent ? (
              <form onSubmit={handleSendCode}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código de verificação</Label>
                    <div className="flex justify-center py-4">
                      <InputOTP
                        value={verificationCode}
                        onChange={setVerificationCode}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {!isCodeSent ? (
              <Button
                className="w-full"
                onClick={handleSendCode}
                disabled={!email || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar código
                    <MailCheck className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  className="w-full bg-nutria-600 hover:bg-nutria-700"
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsCodeSent(false)}
                  type="button"
                  disabled={isLoading}
                >
                  Alterar email
                </Button>
              </>
            )}

            <div className="text-center w-full">
              <p className="text-sm text-gray-500">
                Não tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-nutria-600"
                  onClick={() => router.push("/auth/register")}
                >
                  Crie uma agora
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
