"use server";

import { getSheetData } from "@/app/(actions)/leads/googleSheet.actions";
import { ContactSchemaType } from "@/schemas/contact.schema";
import Nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  recaptchaToken,
}: {
  email: ContactSchemaType;
  recaptchaToken: string;
}) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;

  const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
  const recaptchaJson = await recaptchaRes.json();

  if (
    !recaptchaJson.success ||
    (recaptchaJson.score !== undefined && recaptchaJson.score < 0.8) ||
    (recaptchaJson.action && recaptchaJson.action !== "contact")
  ) {
    return {
      success: false,
      error: "Verificación de reCAPTCHA fallida",
    };
  }

  const transporter = Nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "sales@ctspr.com", //sales@ctspr.com
      subject: "Mensaje de tu Website: CTS PR",
      html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo Mensaje de Contacto</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="background-color: #f5f8fa; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f8fa; padding: 40px 0;">
      <tr>
        <td>
          <table align="center" cellpadding="0" cellspacing="0" width="500" style="background: #ffffff; border-radius: 12px; box-shadow: 0 2px 18px rgba(82, 93, 145, 0.1); padding: 32px 28px; border: 1px solid #e3eaf5;">
            <tr>
              <td style="border-bottom: 1px solid #e3eaf5; padding-bottom: 12px; margin-bottom: 22px;">
                <h2 style="color: #fa4476; font-size: 22px; font-weight: 700; font-family: Inter, Arial, Helvetica, sans-serif; margin: 0 0 4px 0;">Nuevo mensaje de contacto</h2>
                <p style="color: #5e6e8c; font-size: 14px; margin: 0; font-family: Inter, Arial, Helvetica, sans-serif;">Has recibido un nuevo mensaje a través del formulario de contacto.</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <span style="font-weight: 600; color: #525d91; font-size: 14px; font-family: Inter, Arial, Helvetica, sans-serif;">Nombre:</span><br>
                      <span style="color: #232e3a; font-size: 15px; font-family: Inter, Arial, Helvetica, sans-serif;">${email.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <span style="font-weight: 600; color: #525d91; font-size: 14px; font-family: Inter, Arial, Helvetica, sans-serif;">Correo electrónico:</span><br>
                      <span style="color: #232e3a; font-size: 15px; font-family: Inter, Arial, Helvetica, sans-serif;">${email.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <span style="font-weight: 600; color: #525d91; font-size: 14px; font-family: Inter, Arial, Helvetica, sans-serif;">Teléfono:</span><br>
                      <span style="color: #232e3a; font-size: 15px; font-family: Inter, Arial, Helvetica, sans-serif;">${email.phone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <span style="font-weight: 600; color: #525d91; font-size: 14px; font-family: Inter, Arial, Helvetica, sans-serif;">Ciudad:</span><br>
                      <span style="color: #232e3a; font-size: 15px; font-family: Inter, Arial, Helvetica, sans-serif;">${email.city}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <span style="font-weight: 600; color: #525d91; font-size: 14px; font-family: Inter, Arial, Helvetica, sans-serif;">Mensaje:</span><br>
                      <div style=" color: #232e3a; margin-top: 3px; font-size: 15px; font-family: Inter, Arial, Helvetica, sans-serif; line-height: 1.6;">
                        ${email.message}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="margin-top: 32px; border-top: 1px solid #e3eaf5; padding-top: 12px; text-align: center;">
                <span style="color: #94b8d1; font-size: 12px; font-family: Inter, Arial, Helvetica, sans-serif;">
                  Este mensaje fue enviado desde el formulario de contacto de CTS PR.<br>
                  &copy; ${new Date().getFullYear()} CTS PR - Axesa.
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });

    await getSheetData({
      valuesInput: {
        name: email.name,
        email: email.email,
        phone: email.phone,
        city: email.city,
        message: email.message,
      },
    });

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log(error as string);
    return {
      success: false,
      error: error as string,
    };
  }
};
