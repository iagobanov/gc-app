interface EntityCreate<Input, Output> {
  registerRow (row: Input): Promise<Output>;
}

interface EntityRead<Input, Output> {
  findAll (options?: Input): Promise<Output[]>;
  findRow (id: string): Promise<Output>;
}

interface EntityUpdate<Input, Output> {
  updateRow (row: Input): Promise<Output>;
}

interface EntityDelete<Output> {
  deleteRow (id: string): Promise<Output>;
}

export { EntityCreate, EntityRead, EntityUpdate, EntityDelete }