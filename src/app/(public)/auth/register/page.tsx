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

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!name) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      if (res.ok) setIsCodeSent(true);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Erro ao criar usuário", {
        description: "Não foi possível criar o usuário.",
      });
      return;
    }
    setIsLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      if (!res.ok) {
        toast.error("Erro ao verificar código", {
          description: "Código inválido ou expirado.",
        });
        return;
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Erro ao verificar código", {
        description: "Não foi possível verificar o código.",
      });
      return;
    }
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
              {isCodeSent ? "Verificar código" : "Cadastrar"}
            </CardTitle>
            <CardDescription>
              {isCodeSent
                ? "Digite o código de 6 dígitos enviado para seu email"
                : "Use seu email e nome para criar sua conta"}
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
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
              </>
            )}

            <div className="text-center w-full">
              <p className="text-sm text-gray-500">
                Tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-nutria-600"
                  onClick={() => router.push("/auth/login")}
                >
                  Entre agora
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
