type OutputObjectTypes = "log" | "error";

interface OutputObject {
  type: OutputObjectTypes,
  result: string
}

export { OutputObject };