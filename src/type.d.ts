/**  */
interface FileStructure {
  [dirName: string]: string | FileStructure;
}

type Creator = (inputName: string) => FileStructure;

/** easy-component.js default export */
type Config = Creator | [{ label: string; creator: Creator }];
