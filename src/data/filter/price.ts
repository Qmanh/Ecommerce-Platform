import { formatCurrency } from "../../Utils/CustomCurrencyVND";

export const price = [
    {"name":`Below ${formatCurrency(200000)}`, "min":0, "max":200000, value:"0 - 200000"},
    {"name":`${formatCurrency(200000)} - ${formatCurrency(500000)}`, "min":200000, "max":500000, value:"200000 - 500000"},
    {"name":`${formatCurrency(500000)} - ${formatCurrency(1000000)}`, "min":500000, "max":1000000, value:"500000 - 1000000"},
    {"name":`${formatCurrency(1000000)} and above`, "min":1000000, "max":null, value:"1000000"},
]