interface ControllerRead<Input, Output> {
  find (params: Input): Promise<Output>;
}

interface ControllerCreate<Input, Output> {
  create (row: Input): Promise<Output>;
}

interface ControllerUpdate<Input, Output> {
  update (row: Input): Promise<Output>;
}

interface ControllerDelete<Output> {
  delete (id: string): Promise<Output>;
}

export { ControllerRead, ControllerCreate, ControllerUpdate, ControllerDelete }
