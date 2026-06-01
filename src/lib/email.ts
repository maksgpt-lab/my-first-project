import { Resend } from "resend";

const FROM = "AI для бизнеса <noreply@aidabusiness.ru>";

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendWelcomeEmail({
  email,
  plan,
  type,
}: {
  email: string;
  plan: string;
  type: string;
}) {
  const planLabel = plan === "club" ? "Клуб" : "Про";
  const typeLabel = type === "once" ? "навсегда" : "на месяц";

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Добро пожаловать в «${planLabel}»! Доступ открыт`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #d97706;">Поздравляем! 🎉</h2>
        <p>Вы оформили доступ <strong>«${planLabel}» ${typeLabel}</strong> к платформе AI для бизнеса.</p>

        <p><strong>Ваши данные для входа:</strong><br/>
        Логин: <strong>${email}</strong><br/>
        Пароль: тот, что вы указали при регистрации</p>

        <p style="margin-top: 24px;">
          <a href="https://aidabusiness.ru/courses"
             style="background: #d97706; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Перейти к курсам →
          </a>
        </p>

        <p style="margin-top: 32px; color: #666; font-size: 14px;">
          Если возникнут вопросы — напишите через форму на сайте или в Telegram.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">aidabusiness.ru</p>
      </div>
    `,
  });
}

export async function sendExpiryReminderEmail({
  email,
  expiresAt,
}: {
  email: string;
  expiresAt: string;
}) {
  const date = new Date(expiresAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Ваш доступ истекает через 3 дня",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #d97706;">Напоминание о продлении</h2>
        <p>Ваш доступ к курсам истекает <strong>${date}</strong>.</p>
        <p>Чтобы не потерять прогресс и продолжить обучение — продлите подписку в личном кабинете.</p>

        <p style="margin-top: 24px;">
          <a href="https://aidabusiness.ru/pricing"
             style="background: #d97706; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Продлить доступ →
          </a>
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #999; font-size: 12px;">aidabusiness.ru</p>
      </div>
    `,
  });
}
