interface VerifyEmailTemplateProps {
    verificationCode: string;
    recipientName?: string;
  }
  
  export function VerifyEmailTemplate({
    verificationCode,
    recipientName = "Usuário",
  }: VerifyEmailTemplateProps) {
    return (
      <div
        style={{
          fontFamily: "'Helvetica', 'Arial', sans-serif",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#4CAF50",
            padding: "20px",
            borderRadius: "5px 5px 0 0",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "white", margin: 0 }}>Nutria</h1>
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "0 0 5px 5px",
            border: "1px solid #e0e0e0",
            borderTop: "none",
          }}
        >
          <h2 style={{ color: "#333", marginTop: 0 }}>
            Seu código de verificação
          </h2>
          <p style={{ color: "#666", fontSize: "16px" }}>Olá {recipientName},</p>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Use o código abaixo para concluir o login na sua conta Nutria:
          </p>
          <div
            style={{
              margin: "30px 0",
              padding: "15px",
              background: "#f9f9f9",
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                letterSpacing: "8px",
                color: "#4CAF50",
              }}
            >
              {verificationCode}
            </span>
          </div>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Este código expirará em 10 minutos.
          </p>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Se você não solicitou este código, pode ignorar este email.
          </p>
          <div
            style={{
              marginTop: "30px",
              padding: "20px 0 0",
              borderTop: "1px solid #e0e0e0",
              color: "#999",
              fontSize: "14px",
            }}
          >
            <p>
              Este é um email automatizado enviado pela equipe Nutria. Por favor,
              não responda a este email.
            </p>
          </div>
        </div>
      </div>
    );
  }
  