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

/** Shape of a row as it comes back from the `authorities` table. */
export interface AuthorityRow {
  id: string
  name: string
  type: string
  erp_code: string
  location: string
  rates: number
  rules: number
  action: AuthorityAction
  status: AuthorityStatus
}

export function mapAuthorityRow(row: AuthorityRow): Authority {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    erpCode: row.erp_code,
    location: row.location,
    rates: row.rates,
    rules: row.rules,
    action: row.action,
    status: row.status,
  }
}
