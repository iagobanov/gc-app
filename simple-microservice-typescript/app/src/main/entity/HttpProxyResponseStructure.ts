interface HttpProxyResponseStructure<BodyType> {
  isBase64Encoded?: boolean;
  statusCode: number;
  headers?: Record<string, string | object>[];
  body: BodyType;
}

export { HttpProxyResponseStructure }
