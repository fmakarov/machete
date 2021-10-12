module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "alifko@platinn.ru",
      defaultTo: "alifko@platinn.ru",
    },
  },
});