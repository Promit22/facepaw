import { GAP, EU } from '$env/static/private';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: EU,
		pass: GAP
	}
});

export async function sendResetEmail(to: string, link: string) {
	await transporter.sendMail({
		from: `"FacePaw" <${EU}>`,
		to,
		subject: 'Reset your FacePaw password',
		html: `
      <p>You requested a password reset.</p>
      <p>Click below:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 30 minutes.</p>
    `
	});
}
