import { LogRepository } from "../repository/log.repository.js";

export const requestLogger = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    //Cuando se termina de enviar la respuesta al cliente. Tambien hay otros como error, close, data, etc.
    const responseTime = Date.now() - start;

    await LogRepository.createLog({
      //Creo el log en la DB (en este caso Supabase)
      method: req.method,
      endpoint: req.originalUrl,
      status_code: res.statusCode,
      response_time_ms: responseTime,
      ip_address: req.ip,
    });
  });

  //permite que siga el flujo, si no el request se quedaría colgado
  //Es porque no sabe qué quiero hacer (si espero otro middleware, por ejemplo)
  next();
};
