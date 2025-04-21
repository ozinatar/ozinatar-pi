import { PI_TYPES_ARRAY } from "./const";

export interface Totals {
  buy: number;
  sell: number;
  volume: number;
}

export interface All {
  avg: number;
  max: number;
  median: number;
  min: number;
  percentile: number;
  stddev: number;
  volume: number;
  order_count: number;
}

export interface Buy extends All {}
export interface Sell extends All {}

export interface Prices {
  all: All;
  buy: Buy;
  sell: Sell;
  updated: string;
  strategy: string;
}

export interface Meta {}

export interface Item {
  name: string;
  typeID: number;
  typeName: string;
  typeVolume: number;
  quantity: number;
  prices: Prices;
  meta: Meta;
}

export interface Appraisal {
  created: number;
  kind: string;
  market_name: string;
  totals: Totals;
  items: Item[];
  raw: string;
  unparsed?: any;
  private: boolean;
  live: boolean;
}

export interface EvePraisalResult {
  appraisal: Appraisal;
}

// ✅ Tipado alineado al uso real
export interface EvePraisalRequest {
  items: {
    type_id: number;
    quantity: number;
  }[];
}

const PRAISAL_URL = process.env.NEXT_PUBLIC_PRAISAL_URL ?? "";

// ✅ Solicitud principal
export const getPraisal = async (
  request: EvePraisalRequest
): Promise<EvePraisalResult | undefined> => {
  try {
    const res = await fetch(PRAISAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      console.error("Appraisal failed:", res.statusText);
      return undefined;
    }

    return await res.json();
  } catch (e) {
    console.error("Appraisal failed:", e);
    return undefined;
  }
};

// ✅ Fetch completo con todos los PI
export const fetchAllPrices = async (): Promise<EvePraisalResult> => {
  const allPI = PI_TYPES_ARRAY.map((t) => ({
    quantity: 1,
    type_id: t.type_id,
  }));

  return await fetch("api/praisal", {
    method: "POST",
    body: JSON.stringify(allPI),
  }).then((res) => res.json());
};
