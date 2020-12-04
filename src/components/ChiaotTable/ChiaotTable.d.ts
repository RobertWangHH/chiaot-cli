export interface ChiaotTableProps<RecordType = unknown> {
  store: string
  search?: searchKey[]
  data?: RecordType[]
}

interface searchKey {
  key: string
  name: string
  type: number
}
