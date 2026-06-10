export type AuthorityStatus = "pending" | "success" | "error"
export type AuthorityAction = "Create" | "Existing" | "Update"

export interface Authority {
  id: string
  name: string
  type: string
  erpCode: string
  location: string
  rates: number
  rules: number
  action: AuthorityAction
  status: AuthorityStatus
}

export const authorities: Authority[] = [
  { id: "1", name: "Brazil IBS Santos", type: "IBS-CITY", erpCode: "", location: "BRAZIL", rates: 1, rules: 2, action: "Existing", status: "pending" },
  { id: "2", name: "TESTE", type: "ICMS", erpCode: "ICMST1", location: "BRAZIL", rates: 1, rules: 0, action: "Existing", status: "pending" },
  { id: "3", name: "ICMS_SP_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "4", name: "ICMS_GO_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "5", name: "ICMS_PE_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 3, rules: 0, action: "Create", status: "pending" },
  { id: "6", name: "ICMS_PA_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "7", name: "ICMS_CE_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "8", name: "ICMS_BA_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "9", name: "ICMS_RS_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "10", name: "ICMS_MG_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "11", name: "ICMS_RJ_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 3, rules: 0, action: "Create", status: "pending" },
  { id: "12", name: "ICMS_PR_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "13", name: "ICMS_AL_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "14", name: "ICMS_ES_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 3, rules: 0, action: "Create", status: "pending" },
  { id: "15", name: "ICMS_MA_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "16", name: "ICMS_MT_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "17", name: "ICMS_MS_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "18", name: "ICMS_DF_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 2, rules: 0, action: "Create", status: "pending" },
  { id: "19", name: "ICMS_AM_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
  { id: "20", name: "ICMS_RN_", type: "ICMS", erpCode: "", location: "BRAZIL", rates: 1, rules: 0, action: "Create", status: "pending" },
]
