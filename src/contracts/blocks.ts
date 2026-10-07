export type ContractBlock =
  | { kind: 'p'; text: string }
  | { kind: 'note'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; headers: string[]; rows: string[][] }
  | { kind: 'code'; text: string; note?: string }
  | { kind: 'links'; items: { title: string; path: string }[] }
  | { kind: 'sample'; id: string };

export interface ContractSection {
  id: string;
  title: string;
  blocks: ContractBlock[];
}

export interface ContractPage {
  id: string;
  docId: string;
  path: string;
  title: string;
  lede: string;
  sections: ContractSection[];
}

export function pageByPath(pages: ContractPage[], path: string): ContractPage | undefined {
  return pages.find((page) => page.path === path);
}

export function anchorsOf(pages: ContractPage[], group: string) {
  return pages.flatMap((page) =>
    page.sections.map((section) => ({
      group,
      title: section.title,
      path: `${page.path}#${section.id}`,
      pageTitle: page.title,
    })),
  );
}
