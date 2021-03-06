export class NoViewMetadataDefined extends Error {
  name = 'NoViewMetadataDefined';

  constructor(view: Function) {
    super(`No metadata found for view ${view.name}. Did you forgot to add @View() decorator?.`);
  }
}
