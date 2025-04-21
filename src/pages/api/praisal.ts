import { getPraisal } from "@/eve-praisal";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Parseamos el body como array
      const rawRequest: { quantity: number; type_id: number }[] = JSON.parse(req.body);

      // Envolvemos en el formato correcto
      const praisalRequest = {
        items: rawRequest
      };

      const praisal = await getPraisal(praisalRequest);
      return res.json(praisal);
    } catch (e) {
      console.error("Error en appraisal:", e);
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
};

export default handler;
